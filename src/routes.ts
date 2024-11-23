import express from "express";
import { accountsRouter } from "./modules/user/account/account.routes";

const routes = express.Router();

routes.use("/user", accountsRouter);

export { routes };
