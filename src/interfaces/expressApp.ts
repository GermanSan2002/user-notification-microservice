import express from "express";
import { NotificationController } from "./controllers/NotificationController";
import { UserPreferencesController } from "./controllers/UserPreferencesController";
import { NotificationService } from "../application/services/NotificationService";
import { UserPreferencesService } from "../application/services/UserPreferencesService";
import { NotificationRepositoryImpl } from "../infrastructure/persistence/NotificationRepositoryImpl";
import { UserPreferencesRepositoryImpl } from "../infrastructure/persistence/UserPreferencesRepositoryImpl";
import { asyncHandler } from "./utils/asyncHandler";

const app = express();
app.use(express.json());

// Instanciación de los servicios y controladores
const notificationRepository = new NotificationRepositoryImpl();
const userPreferencesRepository = new UserPreferencesRepositoryImpl();

const notificationService = new NotificationService(notificationRepository);
const userPreferencesService = new UserPreferencesService(userPreferencesRepository);

const notificationController = new NotificationController(notificationService);
const userPreferencesController = new UserPreferencesController(userPreferencesService);

// Rutas
app.post("/notifications", asyncHandler((req, res) => notificationController.createNotification(req, res)));
app.get("/notifications/:userId", asyncHandler((req, res) => notificationController.getUserNotifications(req, res)));

app.get("/preferences/:userId", asyncHandler((req, res) => userPreferencesController.getUserPreferences(req, res)));
app.put("/preferences/:userId", asyncHandler((req, res) => userPreferencesController.updateUserPreferences(req, res)));

// Configuración del puerto
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
