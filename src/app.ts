import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import AppDataSource from "./config/db.config";
import { logger } from "./common-module/utils/logger";
import errorHandler from "./common-module/middleware/errorHandler";

class App {
  public app: Express;
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
  }

  configureMiddleware() {
    this.app.use(express.json());
    this.app.use(express.text());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  configureRoutes() {
    // this.app.get(
    //   '/ums/health-check',
    //   (_req: Request, res: Response, _next: NextFunction) => {
    //     return res.send("Health check route working");
    //   }
    // );
    // this.app.use('/ums/api/v1', routes);
    this.app.use("*", (_req: Request, _res: Response, next: NextFunction) => {
      return next(new Error("Routes not found"));
    });
    this.app.use(errorHandler);
  }

  async start(port: number) {
    await this.connectToDb();

    this.app.listen(port, () => {
      logger.info(
        "------------------------------------------------------------"
      );
      logger.info(`[Server]: Server is running on ${port}`);
      logger.info("Time : " + new Date());
      logger.info(
        "------------------------------------------------------------"
      );
    });
  }

  private async connectToDb() {
    await AppDataSource.initialize();
  }
}

const app = new App();

export { app };
