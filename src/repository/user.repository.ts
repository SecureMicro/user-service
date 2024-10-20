import { UserEntity } from "@secure-micro/models";
import AppDataSource from "../config/db.config";

export const UserRepository = AppDataSource.getRepository(UserEntity).extend(
  {}
);
