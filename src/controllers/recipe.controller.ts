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
      const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 if not provided
      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      if (
        isNaN(pageNumber) ||
        isNaN(limitNumber) ||
        pageNumber < 1 ||
        limitNumber < 1
      ) {
        res.status(400).json({ error: "Invalid pagination parameters" });
      }

      // Fetch recipes with pagination
      const recipes = await this.recipeService.findRecipes(
        pageNumber,
        limitNumber
      );

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
      const result = await this.recipeService.createRecipe(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };

  updateRecipe = async (req: Request | any, res: Response) => {
    try {
      const { recipeId } = req.params;
      const result = await this.recipeService.updateRecipe(recipeId, req.body);
      res.status(200).json(result);
    } catch (error: any) {
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
