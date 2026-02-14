import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";


export const getAllProducts = async (req, res) => {
    try {
        const userID = req.user._id;
        const products = await Product.find({ productID: userID });
        res.json({
            products,
        });
    } catch (error) {
        console.error("Error in getAllProducts Controller", error.message);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
}


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category ,businesstype} = req.body;

        // Ensure `req.user._id` is available from the protectRoute middleware
        const productID = req.user._id;

        let cloudinaryResponse = null;

        // If an image is provided, upload it to Cloudinary
        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }

        // Create the product with productID equal to the user's _id
        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url || "", // Use Cloudinary URL or an empty string
            category,
            businesstype,
            productID, // Set the productID as the user's _id
        });

        // Respond with the created product
        res.status(201).json(product);
    } catch (error) {
        console.error("Error in createProduct controller", error.message);
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};




export const deleteProduct = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product)
        {
            return res.status(404).json({
                message:"Product not found"
            })
        }
        if(product.image) {
            const publicID = product.image.split("/").pop().split(".")[0];  //this will display the id of the image
            try{
                await cloudinary.uploader.destroy(`products/${publicID}`);
                console.log("Deleted image from cloudinary");
            }catch(error){
                console.log("Error deleting image from cloudinary",error.message);
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({message:"Product deleted"});
    } catch(error) {
        console.log("Error in deleting product controller",error.message);
        res.status(500).json({message:"server error"});
    }
}




export const getProductsByCategory = async (req,res) => {
    const {category} = req.params;
    try {
        const products = await Product.find({category})
        .populate("productID","name year branch phone instagramURL XURL facebookURL");
        console.log(products);
        res.json({products});
    } catch(error) {
        console.log("error in getProductsByCategory controller");
        res.status(500).json({message:"server error"});
    }
}


// Controller to update product status
export const updateProductStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // status: 'available', 'rent', or 'sold'
  
    // Validate if the provided status is valid
    if (!["available", "rent", "sold"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
  
    try {
      // Find the product by ID and update its status
      const product = await Product.findByIdAndUpdate(
        id,
        { status },
        { new: true } // This option returns the updated document
      );
  
      // If the product wasn't found, return a 404 error
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Successfully updated, send the updated product back in the response
      return res.status(200).json(product);
    } catch (err) {
      // Catch any errors and log them for debugging
      console.error(err);
  
      // Return a 500 status for server errors
      return res.status(500).json({ message: "Server error" });
    }
  };
  









