import "reflect-metadata";
import { AppDataSource } from "./datasource";

export const connectDb = async () => {
  await AppDataSource.initialize()
    .then(() => console.log(`db connected`))
    .catch(console.error);
};
