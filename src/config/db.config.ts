import { ProjectEntity, RefreshTokenEntity, UserEntity } from "@secure-micro/models";
import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const {
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE_NAME,
  DB_HOST,
  NODE_ENV,
} = process.env;

const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE_NAME,
  entities: [
    ProjectEntity,
    UserEntity,
    RefreshTokenEntity
  ],
  synchronize: true,
  logging: NODE_ENV ? true : false,
  ssl: true
});

export default AppDataSource;
