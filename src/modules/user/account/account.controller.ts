// import { Request, Response, NextFunction } from "express";
// import ResponseService from "../../../common-module/utils/response.handler";
// import { IUserAccountController } from "./account.interface";

// class AccountController extends ResponseService implements IUserAccountController {
//     constructor() {
//         super();
//     }

//     userRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         try {
//             const { fullName, email, id, uploadUrl } = req.payload;
//         } catch (error) {
//             next(error);
//         }
//     }
// }