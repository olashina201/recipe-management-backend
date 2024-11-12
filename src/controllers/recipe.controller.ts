import { HttpException } from "../exceptions";
import RecipeService from "../services/recipe.service";
import { NextFunction, Request, Response } from "express";

class RecipeController {
  public recipeService: RecipeService = new RecipeService();
  constructor() {}

  public index = (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        msg: "Hello from App server",
        Time: new Date(),
        status: "success",
        server: "Express + TS Server",
      });
    } catch (error) {
      next(error);
    }
  };

  getRecipes = async (req: Request, res: Response) => {
    try {
      const { page, limit } = req.query;
      const recipes = await this.recipeService.findRecipes();
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  getRecipeById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const recipe = await this.recipeService.findRecipe(id);
      res.status(200).json(recipe);
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  createRecipe = async (req: Request, res: Response) => {
    try {
      const file = req;
      const recipeData = req.body;
  
      const result = await this.recipeService.createRecipe(recipeData, file);
      res.status(201).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };

  updateRecipe = async (req: Request, res: Response) => {
    try {
      const file = req.file;
      const { recipeId } = req.params;
      const recipeData = req.body;
  
      const result = await this.recipeService.updateRecipe(recipeId, recipeData, file);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };

  deleteRecipe = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.recipeService.deleteRecipe(id);
      res.status(204).json({ message: "Recipe deleted" });
    } catch (error) {
      res.status(404).json({ error });
    }
  };
}

export default RecipeController;
