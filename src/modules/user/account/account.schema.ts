import Joi, { ObjectSchema } from "joi";
import { ILoginUser, ILogOut, IRegisterUser } from "./account.interface";

export const userRegisterSchema: ObjectSchema<IRegisterUser> =
  Joi.object<IRegisterUser>({
    fullName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
  });

export const userLoginSchema: ObjectSchema<ILoginUser> = Joi.object<ILoginUser>(
  {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
  }
);

export const logOutSchema: ObjectSchema<ILogOut> = Joi.object<ILogOut>({
  refreshToken: Joi.string().required(),
});
