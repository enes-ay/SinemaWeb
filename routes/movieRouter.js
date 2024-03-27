import express from "express";
import * as movieController from "../controller/movieController.js";

const router=express.Router();

router.route("/category/:id").get(movieController.getMoviesByCategory);
router.route("/category").post(movieController.addCategory);
router.route("/category").get(movieController.getCategories);
router.route("/:id").delete(movieController.deleteMovie);
router.route("/:id").put(movieController.updateMovie);
router.route("/:id").get(movieController.getMovie);
router.route("/").post(movieController.createMovie)
router.route("/").get(movieController.getAllMovies)





/*router.route("/category/:categoryId").get(movieController.getMoviesByCategory);
*/


export default router;