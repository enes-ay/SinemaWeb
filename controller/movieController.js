import Movie from "../model/MovieModel.js";
import User from "../model/UserModel.js";
import Category from "../model/CategoryModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import category from "../model/CategoryModel.js";


const createMovie = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "Movies",
    }
  );

  try {
    console.log(req.body);

    await Movie.create({
      name: req.body.name,
      category:req.body.category,
      description: req.body.description,
      year: req.body.year,
      director: req.body.director,
      user: res.locals.user._id,
      poster_url: result.secure_url,
      poster_id: result.public_id,
    });

    fs.unlinkSync(req.files.image.tempFilePath);

    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
    console.log(error);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    const categories = await Category.find({});

    res.status(200).render("home", {
      movies: movies,
      link: 'home',
      categories,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById({ _id: req.params.id });
    const user = await User.findOne({ _id:movie.user });
    const category = await Category.findOne({ _id:movie.category });
    const username=user.username;

    const categories = await Category.find({});
    let isOwner=false
    let isAdmin=false
    if(res.locals.user){
      isOwner=movie.user.equals(res.locals.user._id)
       if(res.locals.user.isAdmin){
        isAdmin=true
       }
    }

    res.status(200).render("movie_detail", {
      movie,
      categories,
      isOwner,
      isAdmin,
      category,
      username
    
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const poster_id = movie.poster_id;

    await cloudinary.uploader.destroy(poster_id);
    await Movie.findOneAndRemove({ _id: req.params.id });
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
    console.log(error.message);
  }
};
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if(req.files){

      const poster_id = movie.poster_id;
      await cloudinary.uploader.destroy(poster_id);

      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          use_filename: true,
          folder: "Movies",
        }
      );
      movie.poster_url=result.secure_url;
      movie.poster_id=result.public_id;
      fs.unlinkSync(req.files.image.tempFilePath);

    }
      movie.name=req.body.name;
      movie.description=req.body.description;
      movie.year=req.body.year;
      movie.category=req.body.category;
      movie.director=req.body.director;

      movie.save();
      res.status(200).redirect(`/movies/${req.params.id}`);
    
      fs.unlinkSync(req.files.image.tempFilePath);
  
  } catch (error) {

  }
};


const getCategories = async (req, res) => {
  try {

    const categories = await Category.find({});
    const categoryNames = categories.map(category => category.name); // Assuming the category name is stored in the "name" field

    res.status(200).send(categoryNames);
    console.log(categories);
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};
const addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).render("home", {
      succeded: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
    console.log(error);
  }
};

const getMoviesByCategory = async (req,res)=>{
    try {
        const categories = await Category.find({});
        const movies= await Movie.find({category: req.params.id});
        res.status(200).render("home",{
            movies,
            categories,
        });
    } catch (error) {
        res.status(500).json({
            succeded:false,
            error,
        });
    }
};


export {
  createMovie,
  getAllMovies,
  getMovie,
  deleteMovie,
  getCategories,
  addCategory,
  getMoviesByCategory,
  updateMovie
};
