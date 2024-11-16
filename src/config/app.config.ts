import express, { Application } from "express";
import dotenv from "dotenv";
import ErrorMiddleware from "../middleware/error.middleware";
import connectDB from "./db.confg";
import bodyParser from "body-parser";
import cors from "cors";
import { Routes } from "../interfaces/routes.interface";
import { NotFoundError } from "../exceptions";

// Load environment variables
dotenv.config();

export class App {
  app: Application;

  constructor(routes: Routes[]) {
    this.app = express();
    connectDB();
    this.config();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => next(new NotFoundError(req.path))
    );
    this.app.use(ErrorMiddleware.handleError());
  }

  config() {
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cors({ origin: "*" }));
    this.app.use(bodyParser.json());
    this.app.use(express.json({ limit: "50kb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }
}
