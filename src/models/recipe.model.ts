import { Schema, model, Document } from 'mongoose';

export interface RecipeDocument extends Document {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const recipeSchema = new Schema<RecipeDocument>({
  title: { type: String, required: true, minlength: 3, maxlength: 100 },
  description: { type: String, required: true, minlength: 10, maxlength: 500 },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  imageUrl: { type: String, required: true }
}, {
  timestamps: true
});

export default model<RecipeDocument>('Recipe', recipeSchema);