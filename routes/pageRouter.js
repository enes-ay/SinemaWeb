import express from "express";
import * as pageController from "../controller/pageController.js";
import * as movieController from "../controller/movieController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js"

const router=express.Router();

router.route("/").get(movieController.getAllMovies);
router.route("/").get(pageController.getHomePage);
router.route("/movie_detail").get(pageController.getDetailPage);
router.route("/register").get(pageController.getRegisterPage);
router.route("/login").get(pageController.getLoginPage);
router.route("/logout").get(pageController.getLogout);
router.route("/addMovie").get(pageController.getAddmovie);



export default router;