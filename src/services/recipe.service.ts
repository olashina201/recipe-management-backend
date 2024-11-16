import { HttpException } from "../exceptions";
import RecipeModel, { IRecipe } from "../models/recipe.model";
import {
  recipeSchemaValidation,
  updateRecipeSchemaValidation,
} from "../validations/recipe.validation";
import mongoose, { Types } from "mongoose";
import cloudinary, { UploadApiResponse } from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class RecipeService {
  public recipe: any = RecipeModel;

  /*
  |--------------------------------------------------------------------------
  | Create New Recipe
  |--------------------------------------------------------------------------
  */
  public async createRecipe(body: IRecipe): Promise<any> {
    const { error } = recipeSchemaValidation.validate(body);

    if (error) {
      throw new HttpException(400, 2001, "CREATE_RECIPE_VALIDATION_ERROR", [
        error.details[0].message,
      ]);
    }

    const data: any = new this.recipe({
      ...body,
    });

    await data.save();
    return data;
  }

  /*
  |--------------------------------------------------------------------------
  | Find Recipe
  |--------------------------------------------------------------------------
  */
  public async findRecipe(recipeId: string): Promise<any> {
    const data: any = await this.recipe
      .findById(new mongoose.Types.ObjectId(recipeId))
      .lean();
    return data;
  }

  /*
  |--------------------------------------------------------------------------
  | Find All Recipes
  |--------------------------------------------------------------------------
  */
  public async findRecipes(page: number, limit: number): Promise<any> {
    const skip = (page - 1) * limit; // Calculate how many items to skip
    const recipes = await this.recipe
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    const totalCount = await this.recipe.countDocuments(); // Get total count of recipes
    const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

    return {
      recipes,
      totalPages,
      currentPage: page,
      totalCount,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Update Recipe
  |--------------------------------------------------------------------------
  */
  public async updateRecipe(
    recipeId: string,
    payload: Partial<IRecipe>
  ): Promise<any> {
    const { error } = updateRecipeSchemaValidation.validate(payload);

    if (error)
      throw new HttpException(400, 9002, "UPDATE_RECIPE_VALIDATION_ERROR", [
        error.details[0].message,
      ]);

    const recipe = await this.recipe.findById(recipeId);
    if (!recipe) throw new HttpException(400, 1003, "RECIPE_NOT_FOUND");

    const updatedData = await RecipeModel.findByIdAndUpdate(
      recipeId,
      {
        $set: {
          ...payload,
        },
      },
      { new: true }
    );

    if (!updatedData)
      throw new HttpException(400, 9009, "UPDATE_RECIPE_REQUEST_ERROR");

    return updatedData;
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Recipe
  |--------------------------------------------------------------------------
  */
  public async deleteRecipe(recipeId: string): Promise<any> {
    const deletedRecipe = await this.recipe.findByIdAndDelete(recipeId);
    if (!deletedRecipe) throw new HttpException(400, 1003, "RECIPE_NOT_FOUND");
    return { message: "Recipe deleted" };
  }
}

export default RecipeService;
