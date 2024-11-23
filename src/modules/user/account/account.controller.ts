import { Request, Response, NextFunction } from "express";
import ResponseService from "../../../common-module/utils/response.handler";
import { IUserAccountController } from "./account.interface";
import userService from "./account.service";

class AccountController
  extends ResponseService
  implements IUserAccountController
{
  constructor(private readonly service = userService) {
    super();
  }

  registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { statusCode, payload, message } = await this.service.registerUser(
        // @ts-ignore
        req.payload
      );

      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { statusCode, payload, message } = await this.service.loginUser(
        // @ts-ignore
        req.payload
      );

      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  getUserDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // @ts-ignore
      const { id } = req.payload;
      const { statusCode, payload, message } = await this.service.getUserDetail(
        id!
      );

      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('here-------getUserProfile--------------------')
      // @ts-ignore
      const user = req.user;
      const { statusCode, payload, message } =
        await this.service.getUserProfile(user);

      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // @ts-ignore
      const { refreshToken } = req.payload;

      const { statusCode, payload, message } = await this.service.logout(
        refreshToken
      );
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };
}

const accountController = new AccountController();
export default accountController;
