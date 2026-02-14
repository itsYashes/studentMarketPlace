import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name cannot be Empty"],
    },
    email : {
        type : String,
        required : [true,"Email cannot be Empty"],
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : [true,"Password cannot be Empty"],
        minLength : [6,"Password must be at least 6 characters"],
    },
    year : {
        type : Number,
        min : 1,
        max : 4,
        required : true
    },
    branch : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
        match : [/^\d{10}$/,"Please enter a valid 10-digit phone number"],
    },
    instagramURL : {
        type : String,
        required : false
    },
    XURL : {
        type : String,
        required : false
    },
    facebookURL : {
        type:String,
        required : false
    }

},
{
    timestamps : true,
}
);




//Pre-Hook to hash password before sending to the database
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    } catch(error) {
        next(error);
    }
})


//validation of password

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
}

const User = mongoose.model("User",userSchema);

export default User;

