import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import RecipeController from "../controllers/recipe.controller";
import upload from "../middleware/multer";

class IndexRoute implements Routes {
  public path = "/recipes";
  public router = Router();
  public recipeController = new RecipeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/test`, this.recipeController.index);

    this.router.post(`${this.path}`, upload.single('imageUrl'), this.recipeController.createRecipe);
    this.router.get(`${this.path}`, this.recipeController.getRecipes);
    this.router.get(`${this.path}/:id`, this.recipeController.getRecipeById);
    this.router.put(`${this.path}/:id`, upload.single('imageUrl'), this.recipeController.updateRecipe);
    this.router.delete(`${this.path}/:id`, this.recipeController.deleteRecipe);
  }
}

export default IndexRoute;
