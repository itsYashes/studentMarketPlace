
import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    name : {
        type : String,
        required : [true,"Name is required"]
    },
    description : {
        type : String,
        required : [true,"Description is required"]
    },
    price : {
        type : Number,
        min : 0,
        required : true
    },
    image : {
        type : String,
        required : [true,"Image is required"]
    },
    category : {
        type : String,
        required : [true,"Category is required"]
    },
    businesstype : {
        type : String,
        enum : ["sell","rent"],
        required:true
    },
    status : {
        type : String,
        enum : ["available","sold","rented"],
        default : "available"
    }
},
{
    timestamps : true,
}
);


const Product = mongoose.model("Product",productSchema);

export default Product;