import {create} from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";


export const useProductStore = create((set) => ({
    products:[],
    loading:false,

    setProducts:(products) => set({products}),




    createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/products", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
			toast.success("Product created successfully");
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},



	fetchAllProducts: async (req,res) => {
		set({ loading: true });
		try {
			const res = await axios.get("/products");
			set({products:res.data.products,loading:false});
		} catch(error) {
			console.log("Error in fetching Items");
			toast.error(error.response.data.error) || "Failed to fetch products";
		}
	},


	deleteProduct: async (productID) => {
		set({ loading: true });
		console.log(productID);
		try {
		  console.log("Exit 0");
		  await axios.delete(`/products/${productID}`);
		  console.log("Exit 1");
		  // Update local product state before re-rendering the list
		  set((prevProducts) => ({
			products: prevProducts.products.filter((product) => product._id !== productID),
		  }));
		  set({ loading: false });
		} catch (error) {
		  set({ loading: false });
		  console.log(error.message);
		  toast.error(error.response.data.error || "Failed to delete product");
		}
	  },


	fetchProductsByCategory:async (category) => {
		set({ loading: true ,products:[]});
		try {
			const res = await axios.get(`/products/category/${category}`);
			set({products:res.data.products,loading:false});
		} catch(error) {
			console.log("Error in fetching Items");
			toast.error(error.response.data.error) || "Failed to fetch products";
			set({ loading: false }); // Ensure loading is set to false even if the request fails

		}
	},


	updateProductStatus: async (id, status) => {
		try {
		  // Send request to update the product status in the database
		  const response = await axios.put(`/products/update-status/${id}`, { status });
		  
		  // Check the response to ensure the status was updated successfully
		  if (response.status === 200) {
			// After updating the product status in the database, update the local state
			set((state) => ({
			  products: state.products.map((product) =>
				product._id === id ? { ...product, status: status } : product
			  ),
			}));
	  
			toast.success("Product status updated successfully");
		  } else {
			// If the response is not 200, show an error
			toast.error("Failed to update product status on the server");
		  }
		} catch (err) {
		  console.error("Error updating product status:", err);
		  toast.error("Failed to update product status");
		}
	  }
	  
	  
	



	
	
    
}))
