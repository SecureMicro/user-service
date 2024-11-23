import express, { Router } from "express";
import validatePayload from "../../../common-module/middleware/validator";
import {
  logOutSchema,
  userLoginSchema,
  userRegisterSchema,
} from "./account.schema";
import accountController from "./account.controller";
import authorizer from "../../../common-module/middleware/permissionAuthorizer";

const router: Router = express.Router();

router.post(
  "/register",
  validatePayload(userRegisterSchema),
  accountController.registerUser
);

router.post(
  "/login",
  validatePayload(userLoginSchema),
  accountController.loginUser
);

router.get("/profile", authorizer(), accountController.getUserProfile);

router.post("/logout", validatePayload(logOutSchema), accountController.logout);

export { router as accountsRouter };
