import Joi from "joi";

// Recipe validation schema
export const recipeSchemaValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  ingredients: Joi.array().items(Joi.string().required()).min(1).required(),
  instructions: Joi.array().items(Joi.string().required()).min(1).required(),
  imageUrl: Joi.string().required()
});

export const updateRecipeSchemaValidation = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).max(500).optional(),
  ingredients: Joi.array().items(Joi.string().optional()).min(1).optional(),
  instructions: Joi.array().items(Joi.string().optional()).min(1).optional(),
  imageUrl: Joi.string().optional()
});
