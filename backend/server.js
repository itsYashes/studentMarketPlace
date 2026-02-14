import "./env.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import authRoutes from "./routes/auth.routes.js";
import connectDB from "./lib/db.js";
import productRoutes from "./routes/produt.route.js";
import cookieParser from "cookie-parser";


const app = express();

const PORT = process.env.PORT || 9080;




app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use(express.json({limit: "50mb"}));
app.use(cookieParser());



app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);


if(process.env.NODE_ENV === "production")
{
    const rootDir = path.resolve(__dirname, "..");
    app.use(express.static(path.join(rootDir, "frontend", "dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(rootDir, "frontend", "dist", "index.html"));
    })
}




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})
