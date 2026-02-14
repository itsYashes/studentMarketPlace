import {create} from "zustand";
import axios from "../lib/axios";
import {toast} from "react-hot-toast";
import { ins } from "framer-motion/client";


export const useUserStore = create((set,get) => ({
    user: null,
    loading: false,
    checkingAuth:true,

    signup:async({name,email,password,confirmPassword,year,branch,phone,instagramURL,XURL,facebookURL})=>{
        set({loading:true});
        if(password !== confirmPassword)
        {
            set({loading:false});
            return toast.error("Passwords do not match");
        }
        try {
            const res = await axios.post("/auth/signup",{
                name,
                email,
                password,
                year,
                branch,
                phone,
                instagramURL,
                XURL,
                facebookURL
            });
            console.log("I am here")
            set({user:res.data,loading:false});
            toast.success("Signup successful");
        } catch (error) {
            toast.error('Something went wrong');
            set({loading:false});
        }
    },


    login: async (email, password) => {
        set({loading: true});
        try {
            const res = await axios.post("/auth/login", {
                email,
                password,
            });
            set({user: res.data, loading: false});
            toast.success("Login successful");
        } catch (error) {
            set({loading: false});
            // Checking if error.response exists and providing a fallback message
            const errorMessage = error.response?.data?.message || 'Something went wrong';
            toast.error(errorMessage);
        }
    },
    

    checkAuth :async()=>{
        set({checkingAuth:true});
        try {
            const res = await axios.get("/auth/profile");
            set({user:res.data,checkingAuth:false});
        } catch (error) {
            set({checkingAuth:false,user:null});
        }
    },

    logout: async () => {
		try {
			await axios.post("/auth/logout");
			set({ user: null });
            toast.success("Logout successful");
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},

    refreshToken : async() => {
        if(get().checkingAuth) return;
        set({checkingAuth : true});
        try {
            const response = await axios.post("/auth/refreshToken");
            set({checkingAuth : false});
            return response.data;
        } catch(error) {
            set({user : null,checkingAuth : false});
            throw error;
        }
    }


   

}));
