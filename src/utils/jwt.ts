import { UserEntity } from "@secure-micro/models";
import jwt from "jsonwebtoken";

class JwtService {
  private accessTokenSecret: string = process.env.JWT_SECRET!;
  private refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET!;

  generateUserAccessToken = async (user: UserEntity): Promise<string> => {
    const { id } = user;

    return new Promise((res, rej) => {
      jwt.sign(
        {
          userId: id,
        },
        this.accessTokenSecret,
        {
          expiresIn: process.env.NODE_ENV === "dev" ? "5d" : "10m",
        },
        (err, token) => {
          if (err) return rej(err);

          return res(token!);
        }
      );
    });
  };

  generateRefreshToken = (user: UserEntity): Promise<string> => {
    const { id } = user;
    return new Promise((res, rej) => {
      jwt.sign(
        { userId: id },
        this.refreshTokenSecret,
        { expiresIn: "5d" },
        (err, token) => {
          if (err) return rej(err);

          return res(token!);
        }
      );
    });
  };

  verifyRefreshToken = (refreshToken: string): Promise<{ userId: string }> => {
    return new Promise((res, rej) => {
      jwt.verify(refreshToken, this.refreshTokenSecret, (err, data) => {
        if (err) return rej(err);

        const payload = data as { userId: string };
        return res(payload);
      });
    });
  };
}

const jwtService = new JwtService();
export default jwtService;
