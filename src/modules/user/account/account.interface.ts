import { NextFunction, Request, Response } from "express";
import { IServiceResponse } from "../../../common-module/utils/interface";
import { UserEntity } from "@secure-micro/models";

export interface IUserAccountController {
  registerUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  loginUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUserDetail(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IUserAccountService {
  registerUser(payload: IRegisterUser): Promise<IServiceResponse>;
  loginUser(payload: ILoginUser): Promise<IServiceResponse>;
  getUserDetail(id: string): Promise<IServiceResponse>;
  getUserProfile(user: Partial<UserEntity>): Promise<IServiceResponse>;
  logout(payload: ILogOut): Promise<IServiceResponse>;
}

export interface IRegisterUser {
  fullName: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILogOut {
  refreshToken: string;
}
