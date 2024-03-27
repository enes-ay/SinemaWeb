import User from "../model/UserModel.js";
import Movie from "../model/MovieModel.js";
import Category from "../model/CategoryModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      sucdeded: true,
      user: user._id,
    });
  } catch (error) {
    let errors_register = {};

    if (error.code === 11000) {
      if (error.keyPattern["email"]) {
        errors_register.email = "Bu email zaten kayıtlı";
      } else {
        errors_register.username = "Bu kullanıcı adı zaten kayıtlı";
      }
    }

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors_register[key] = error.errors[key].message;
      });
    }
    res.status(400).json(errors_register);

    console.log(error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    let same = false;
    
    if (user) {
      same = await bcrypt.compare(password, user.password);
    } 

    else {

      return res.status(401).json({
        succeded: false,
        error: error,
      });

    }
    if (same) {

        const token =  createToken(user._id)
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 1000*60*60*24,
        });

      res.redirect("/users/dashboard");
    } else {
      res.status(401).json({
        succeded: false,
        error: "yanlış şifre girdiniz",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
    console.log(error);
  }
};

const createToken = (userId) => {
  return JWT.sign({ userId }, process.env.JWT_KEY, { expiresIn: "35m" });
};

const getDashboardPage = async (req, res) => {
  const movies = await Movie.find({ user: res.locals.user._id });
  const categories = await Category.find({});

  res.render("dashboard", {
    link: "dashboard",
    movies,
    categories,
  });
};

export { createUser, loginUser, getDashboardPage };
