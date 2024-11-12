import { HttpException } from "../exceptions";
import DroneService from "../services/recipe.service";
import { NextFunction, Request, Response } from "express";

class RecipeController {
  public droneService: DroneService = new DroneService();
  constructor() {}
  
  public index = (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        msg: "Hello from App server",
        Time: new Date(),
        status: 'success',
        server: "Express + TS Server",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default RecipeController;
