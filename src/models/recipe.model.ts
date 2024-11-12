import { Schema, model, Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
}

const recipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true, minlength: 3, maxlength: 100 },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, {
  timestamps: true
});

export default model<IRecipe>('Recipe', recipeSchema);