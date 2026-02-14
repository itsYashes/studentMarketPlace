import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {redis} from "../lib/redis.js";


const generateTokens = (userID) => {
    const accessToken = jwt.sign({userID},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : "6d",
    });

    const refreshToken = jwt.sign({userID},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"7d",
    })
    return {accessToken,refreshToken};
    }

const storeRefreshTokens = async(userID,refreshToken) => {
    await redis.set(`Refresh Token : ${userID}`,refreshToken,"EX",7*24*60*60);
}


const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};

export const signup = async (req, res) => {
    const {email,password,name,year,branch,phone,instagramURL,XURL,facebookURL} = req.body;
    try {
        const userExists = await User.findOne({email});
        if(userExists)
        {
            return res.status(400).json({message : "User already Exists"});
        }
        const user = await User.create({name,email,password,year,branch,phone,instagramURL,XURL,facebookURL});

        //authenticate
        const {accessToken,refreshToken} = generateTokens(user._id);
        await storeRefreshTokens(user._id,refreshToken);
        setCookies(res,accessToken,refreshToken);
        res.status(201).json({
            user:{
                _id : user._id,
                name:user.name,
                email:user.email,
                year:user.year,
                branch:user.branch,
                phone:user.phone,
                instagramURL:user.instagramURL,
                XURL:user.XURL,
                facebookURL:user.facebookURL
            },
            message : "User created successfully",
        })
    } catch(error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (user && (await user.comparePassword(password))) {
            const {accessToken, refreshToken} = generateTokens(user._id);
            await storeRefreshTokens(user._id, refreshToken);
            setCookies(res, accessToken, refreshToken);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                message: "Logged in Successfully"
            });
        } else {
            res.status(401).json({
                message: "Invalid Credentials"
            });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken)
        {
            const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`Refresh Token : ${decoded.userID}`)
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({
            message:"Logged out successfully"
        })
    } catch(error) {
        res.status(500).json({
            error:error.message,
            message:"Fuck You"
        })
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken)
        {
            return res.status(401).json({
                message:"No Refresh Token Provided"
            })
        }
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redis.get(`Refresh Token : ${decoded.userID}`);
        if(storedToken !== refreshToken)
        {
            return res.status(401).json({
                message:"Invalid Refresh Token"
            })
        }
        const accessToken = jwt.sign({userID : decoded.userID},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : "15m",
        });
        res.cookie("accessToken",accessToken,{
            httpOnly:true,  //prevents XSS attacks -> cross site scripting attack
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",  //prevents CSRF attack -> cross site request forgery attack
            maxAge:15 * 60 * 1000,  //15 Minutes
        })
        res.json({
            message:"Token refreshed successfully"
        })
    } catch(error) {
        res.status(500).json({
            error:error.message,
            message:"Server side error"
        })
    }
}

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
