import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost", // Cambia según tu entorno
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "user_notifications",
  synchronize: true, // Usar solo en desarrollo para sincronizar automáticamente
  logging: false,
  entities: ["src/infrastructure/entities/**/*.ts"],
  migrations: ["src/infrastructure/migrations/**/*.ts"],
  subscribers: ["src/infrastructure/subscribers/**/*.ts"],
});
