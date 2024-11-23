import { RefreshTokenEntity } from "@secure-micro/models";
import AppDataSource from "../config/db.config";

export const RefreshTokenRepository = AppDataSource.getRepository(
  RefreshTokenEntity
).extend({
  createAndSave(data: Partial<RefreshTokenEntity>) {
    const refreshToken = this.create(data);
    return this.save(refreshToken);
  }
});
