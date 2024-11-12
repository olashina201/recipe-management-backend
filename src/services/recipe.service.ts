import { HttpException } from "../exceptions";
import RecipeModel, { IRecipe } from "../models/recipe.model";
import { recipeSchemaValidation, updateRecipeSchemaValidation } from "../validations/recipe.validation";
import mongoose, { Types } from "mongoose";
import cloudinary, { UploadApiResponse } from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class RecipeService {
  public recipe: any = RecipeModel;

  /*
  |--------------------------------------------------------------------------
  | Create New Recipe
  |--------------------------------------------------------------------------
  */
  public async createRecipe(body: IRecipe, file: any): Promise<any> {
    const { error } = recipeSchemaValidation.validate(body);

    if (error) {
      throw new HttpException(400, 2001, "CREATE_RECIPE_VALIDATION_ERROR", [error.details[0].message]);
    }

    let imageUrl = '';

    // Handle image upload if a file is provided
    if (file) {
      const uploadResponse: UploadApiResponse = await cloudinary.v2.uploader.upload(file.path);
      imageUrl = uploadResponse.secure_url;
    }

    const data: any = new this.recipe({
      ...body,
      imageUrl: imageUrl || body.imageUrl, // Use imageUrl from file or body if not uploaded
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
    const data: any = await this.recipe.findById(new mongoose.Types.ObjectId(recipeId)).lean();
    return data;
  }

  /*
  |--------------------------------------------------------------------------
  | Find All Recipes
  |--------------------------------------------------------------------------
  */
  public async findRecipes(): Promise<any> {
    const data: any = await this.recipe.find({}).lean();
    return data;
  }

  /*
  |--------------------------------------------------------------------------
  | Update Recipe
  |--------------------------------------------------------------------------
  */
  public async updateRecipe(recipeId: string, payload: Partial<IRecipe>, file: any): Promise<any> {
    const { error } = updateRecipeSchemaValidation.validate(payload);

    if (error) throw new HttpException(400, 9002, 'UPDATE_RECIPE_VALIDATION_ERROR', [error.details[0].message]);

    const recipe = await this.recipe.findById(recipeId);
    if (!recipe) throw new HttpException(400, 1003, 'RECIPE_NOT_FOUND');

    // Handle image upload if a new file is provided
    let updatedImageUrl = recipe.imageUrl; // Keep the existing image if no new image is provided
    if (file) {
      const uploadResponse: UploadApiResponse = await cloudinary.v2.uploader.upload(file.path);
      updatedImageUrl = uploadResponse.secure_url;
    }

    const updatedData = await RecipeModel.findByIdAndUpdate(recipeId, {
      $set: {
        ...payload,
        imageUrl: updatedImageUrl,
      }
    }, { new: true });

    if (!updatedData) throw new HttpException(400, 9009, 'UPDATE_RECIPE_REQUEST_ERROR');

    return updatedData;
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Recipe
  |--------------------------------------------------------------------------
  */
  public async deleteRecipe(recipeId: string): Promise<any> {
    const deletedRecipe = await this.recipe.findByIdAndDelete(recipeId);
    if (!deletedRecipe) throw new HttpException(400, 1003, 'RECIPE_NOT_FOUND');
    return { message: 'Recipe deleted' };
  }
}

export default RecipeService;
