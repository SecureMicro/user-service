import { NextFunction, Request, Response } from "express";
import { IServiceResponse } from "../../../common-module/utils/interface";

export interface IUserAccountController {
    userRegister(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IUserAccountService {
    userRegister(req: Request, res: Response, next: NextFunction): Promise<IServiceResponse>;
}