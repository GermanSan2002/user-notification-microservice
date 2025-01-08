import { Request, Response } from "express";
import { NotificationService } from "../../application/services/NotificationService";
import { NotificationDTO } from "../../application/dtos/NotificationDTO";

export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  // Crear una nueva notificación
  async createNotification(req: Request, res: Response): Promise<Response> {
    const notificationDTO: NotificationDTO = req.body;

    // Validar entrada
    if (!notificationDTO.userId || !notificationDTO.message || !notificationDTO.channel) {
      return res.status(400).json({ error: "Datos de entrada inválidos" });
    }

    try {
      const notification = await this.notificationService.createNotification(notificationDTO);

      // Validar que el servicio devuelve un `id`
      if (!notification.id) {
        return res.status(500).json({ error: "No se pudo crear la notificación correctamente" });
      }

      return res.status(201).json(notification);
    } catch (error: any) {
      console.error("Error en createNotification:", error);
      return res.status(500).json({ error: error.message || "Error interno del servidor" });
    }
  }

  // Obtener las notificaciones de un usuario
  async getUserNotifications(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    try {
      const notifications = await this.notificationService.getNotificationsByUser(userId);
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json({ error: JSON.stringify(error, null, 2) });
    }
  }
}
