import express from "express";
import dotenv from "dotenv";
import conn from   "./db.js"
import pageRouter from "./routes/pageRouter.js";
import movieRouter from "./routes/movieRouter.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/authMiddleware.js";
import fileUpload from "express-fileupload";
import {v2 as cloudinary} from "cloudinary";
import methodOverride from  "method-override"

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
});

conn(); // database connect

const app=express();

app.use(express.json());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("node_modules"));
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles:true }));
app.use(methodOverride(
    '_method',{
        methods: ['POST','GET'],
    }
));

const port=process.env.PORT;


app.listen(port,()=>
{
    console.log("listening on port 3000");
});


// routes

app.use("*",checkUser);
app.use("/",pageRouter);
app.use("/movies",movieRouter);
app.use("/users",userRouter);









