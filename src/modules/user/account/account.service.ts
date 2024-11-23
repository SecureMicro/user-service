import { FindOptionsWhere } from "typeorm";
import ResponseService from "../../../common-module/utils/response.handler";
import { UserRepository } from "../../../repository/user.repository";
import jwtService from "../../../utils/jwt";
import { UserEntity } from "@secure-micro/models";
import { IServiceResponse } from "../../../common-module/utils/interface";
import {
  ILoginUser,
  ILogOut,
  IRegisterUser,
  IUserAccountService,
} from "./account.interface";
import {
  BadRequestError,
  NotAuthorisedError,
  NotFoundError,
} from "../../../common-module/errors";
import { RefreshTokenRepository } from "../../../repository/refreshToken.repository";
import bcrypt from "bcrypt";

class AccountService extends ResponseService implements IUserAccountService {
  constructor(
    private readonly _jwtService = jwtService,
    private readonly repository = UserRepository,
    private readonly refreshTokenRepository = RefreshTokenRepository
  ) {
    super();
  }

  private async getUser(
    param: FindOptionsWhere<UserEntity>
  ): Promise<UserEntity | null> {
    return await this.repository.findOneBy(param);
  }

  registerUser = async (payload: IRegisterUser): Promise<IServiceResponse> => {
    const { fullName, email, password } = payload;

    const existUser = await this.repository.findOne({ where: { email } });

    if (existUser) throw new BadRequestError("User already exist");

    const hashPassword = await bcrypt.hash(password, 10);

    const userObj = this.repository.create({
      fullName,
      email,
      password: hashPassword,
    });

    const user = await this.repository.save(userObj);

    const userDetails = {
      fullName: user.fullName,
      email: user.email,
    };

    return this.serviceResponse(
      200,
      userDetails,
      "User registered successfully"
    );
  };

  loginUser = async (payload: ILoginUser): Promise<IServiceResponse> => {
    const { email, password } = payload;

    const user = await this.repository.findOneBy({
      email,
    });

    if (!user) throw new NotAuthorisedError("User details not found");

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new NotAuthorisedError("Password didn't match");

    const [token, refreshToken] = await Promise.all([
      this._jwtService.generateUserAccessToken(user),
      this._jwtService.generateRefreshToken(user),
    ]);

    await this.refreshTokenRepository.createAndSave({
      refreshToken,
      user: user,
    });

    const userDetails = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    };

    return this.serviceResponse(
      200,
      { userDetails, token, refreshToken },
      "User login successfully"
    );
  };

  getUserDetail = async (id: string): Promise<IServiceResponse> => {
    const user = await this.repository.findOneBy({ id });

    if (!user) throw new NotFoundError("User not found");

    return this.serviceResponse(200, user, "User retrieved successfully");
  };

  getUserProfile = async (
    user: Partial<UserEntity>
  ): Promise<IServiceResponse> => {
    return this.serviceResponse(200, user, "User profile fetched successfully");
  };

  logout = async (payload: ILogOut): Promise<IServiceResponse> => {
    const { refreshToken } = payload;

    await this.refreshTokenRepository.delete({ refreshToken });
    return this.serviceResponse(200, {}, "Successfully logged out");
  };
}

export default new AccountService();
