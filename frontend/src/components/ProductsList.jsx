import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { deleteProduct, products, updateProductStatus } = useProductStore();

  // Handle status change and trigger a state update
  const handleStatusChange = (id, status) => {
    // Update status in the store (or API)
    updateProductStatus(id, status);

    // Optionally, you can re-fetch the products after status change if required
    // fetchProducts();
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop Table */}
      <table className="hidden md:table min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                    {product.status === "sold" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <span className="text-white font-bold text-sm uppercase">
                          Sold
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  Rs.{product.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center text-gray-300 text-sm">
                    <input
                      type="checkbox"
                      checked={product.status === "available"}
                      onChange={() => handleStatusChange(product._id, "available")}
                      className="form-checkbox h-4 w-4 text-emerald-400 focus:ring-emerald-500"
                    />
                    <span className="ml-2">Mark as Available</span>
                  </label>
                  <label className="flex items-center text-gray-300 text-sm">
                    <input
                      type="checkbox"
                      checked={product.status === "rent"}
                      onChange={() => handleStatusChange(product._id, "rent")}
                      className="form-checkbox h-4 w-4 text-yellow-400 focus:ring-yellow-500"
                    />
                    <span className="ml-2">Mark as Rented</span>
                  </label>
                  <label className="flex items-center text-gray-300 text-sm">
                    <input
                      type="checkbox"
                      checked={product.status === "sold"}
                      onChange={() => handleStatusChange(product._id, "sold")}
                      className="form-checkbox h-4 w-4 text-red-400 focus:ring-red-500"
                    />
                    <span className="ml-2">Mark as Sold</span>
                  </label>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-400 hover:text-red-300 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-600 focus:outline-none"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Responsive Design */}
      <div className="md:hidden">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-gray-700 rounded-lg shadow-md p-4 mb-4"
          >
            <div className="flex items-center mb-4">
              <div className="relative h-16 w-16">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={product.image}
                  alt={product.name}
                />
                {product.status === "sold" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <span className="text-white font-bold text-sm uppercase">
                      Sold
                    </span>
                  </div>
                )}
              </div>
              <div className="ml-4">
                <h4 className="text-white text-lg font-semibold">
                  {product.name}
                </h4>
                <p className="text-gray-300 text-sm">{product.category}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-300">
                <span className="font-bold text-emerald-400">
                  Rs.{product.price.toFixed(2)}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="flex items-center text-gray-300 text-sm">
                <input
                  type="checkbox"
                  checked={product.status === "available"}
                  onChange={() => handleStatusChange(product._id, "available")}
                  className="form-checkbox h-4 w-4 text-emerald-400 focus:ring-emerald-500"
                />
                <span className="ml-2">Mark as Available</span>
              </label>
              <label className="flex items-center text-gray-300 text-sm">
                <input
                  type="checkbox"
                  checked={product.status === "rent"}
                  onChange={() => handleStatusChange(product._id, "rent")}
                  className="form-checkbox h-4 w-4 text-yellow-400 focus:ring-yellow-500"
                />
                <span className="ml-2">Mark as Rented</span>
              </label>
              <label className="flex items-center text-gray-300 text-sm">
                <input
                  type="checkbox"
                  checked={product.status === "sold"}
                  onChange={() => handleStatusChange(product._id, "sold")}
                  className="form-checkbox h-4 w-4 text-red-400 focus:ring-red-500"
                />
                <span className="ml-2">Mark as Sold</span>
              </label>
            </div>
            <button
              onClick={() => deleteProduct(product._id)}
              className="text-red-400 hover:text-red-300 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-600 focus:outline-none"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductsList;
