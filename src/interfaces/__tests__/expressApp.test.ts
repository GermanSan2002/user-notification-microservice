import request from "supertest";
import { Application } from "express";
import { NotificationController } from "../controllers/NotificationController";
import { UserPreferencesController } from "../controllers/UserPreferencesController";
import { NotificationService } from "../../application/services/NotificationService";
import { UserPreferencesService } from "../../application/services/UserPreferencesService";
import { NotificationRepositoryImpl } from "../../infrastructure/persistence/NotificationRepositoryImpl";
import { UserPreferencesRepositoryImpl } from "../../infrastructure/persistence/UserPreferencesRepositoryImpl";
import express from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Frequency } from "../../domain/enums/Frequency";
import { Channel } from "../../domain/enums/Channel";
import { AlertTypeRepositoryImpl } from "../../infrastructure/persistence/AlertTypeRepositoryImpl";

const app: Application = express();
app.use(express.json());

// Mock de repositorios
const notificationRepository = new NotificationRepositoryImpl();
const userPreferencesRepository = new UserPreferencesRepositoryImpl();
const alertTypeRepository = new AlertTypeRepositoryImpl();

// Instancias de servicios y controladores
const notificationService = new NotificationService(notificationRepository);
const userPreferencesService = new UserPreferencesService(userPreferencesRepository, alertTypeRepository);

const notificationController = new NotificationController(notificationService);
const userPreferencesController = new UserPreferencesController(userPreferencesService);

// Configuración de rutas
app.post(
  "/notifications",
  asyncHandler((req, res) => notificationController.createNotification(req, res))
);
app.get(
  "/notifications/:userId",
  asyncHandler((req, res) => notificationController.getUserNotifications(req, res))
);

app.get(
  "/preferences/:userId",
  asyncHandler((req, res) => userPreferencesController.getUserPreferences(req, res))
);
app.put(
  "/preferences/:userId",
  asyncHandler((req, res) => userPreferencesController.updateUserPreferences(req, res))
);

describe("Pruebas de los endpoints de la API", () => {
  describe("POST /notifications", () => {
    it("debería crear una nueva notificación", async () => {
      const mockNotification = {
          id: "1234",
          userId: "12345",
          recipient: "test@example.com",
          message: "Test message",
          channel: "EMAIL",
          priority: "HIGH",
      };
  
      const response = await request(app)
          .post("/notifications")
          .send(mockNotification);
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id"); // Verifica que `id` esté presente.
    });
  });

  describe("GET /notifications/:userId", () => {
    it("debería obtener todas las notificaciones de un usuario", async () => {
      const response = await request(app).get("/notifications/12345");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /preferences/:userId", () => {
    const mockPreferences = {
      userId: "12345",
      alertTypes: [{id: "1", alert: "alert"}],
      frequency: Frequency.DAILY,
      preferredChannels: [Channel.EMAIL],
      doNotDisturb: false,
    };

    beforeAll(() => {
      // Agregar datos de prueba
      userPreferencesRepository.save(mockPreferences);
    });

    it("debería obtener las preferencias de un usuario", async () => {
      const response = await request(app).get("/preferences/12345");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("userId", "12345");
    });

    afterAll(() => {
      // Limpiar los datos de prueba
      userPreferencesRepository.delete("12345");
    });
  });

  describe("PUT /preferences/:userId", () => {
    const mockPreferences = {
      userId: "12345",
      alertTypes: [{id: "1", alert: "alert"}],
      frequency: Frequency.DAILY,
      preferredChannels: [Channel.EMAIL],
      doNotDisturb: false,
    };

    const mockAlertType = {
      id: "1",
      alert: "alert"
    }

    beforeAll(() => {
      // Agregar datos de prueba
      alertTypeRepository.save(mockAlertType);
      userPreferencesRepository.save(mockPreferences);
    });

    it("debería actualizar las preferencias de un usuario", async () => {
      const response = await request(app)
        .put("/preferences/12345")
        .send({
          userId: "12345",
          alertTypes: ["1"],
          frequency: Frequency.WEEKLY,
          preferredChannels: [Channel.SMS],
          doNotDisturb: false,
        });
      expect(response.status).toBe(200);
      //expect(response.body).toHaveProperty("userId", "12345");
      //expect(response.body).toHaveProperty("frequency", "DAILY");
    });

    afterAll(() => {
      userPreferencesRepository.delete("12345");
      alertTypeRepository.delete("1");
    });
  });
});
