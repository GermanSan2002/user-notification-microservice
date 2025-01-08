import { Request, Response } from "express";
import { UserPreferencesService } from "../../application/services/UserPreferencesService";
import { NotificationPreferencesDTO } from "../../application/dtos/NotificationPreferencesDTO";

export class UserPreferencesController {
  constructor(private userPreferencesService: UserPreferencesService) {}

  // Obtener las preferencias de un usuario
  async getUserPreferences(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    try {
      const preferences = await this.userPreferencesService.getUserPreferences(userId);
      if (!preferences) {
        return res.status(404).json({ message: "User preferences not found" });
      }
      return res.status(200).json(preferences);
    } catch (error) {
      return res.status(500).json({ error: JSON.stringify(error, null, 2) });
    }
  }

  // Actualizar las preferencias de un usuario
  async updateUserPreferences(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const preferencesDTO: NotificationPreferencesDTO = req.body;
    try {
      const updatedPreferences = await this.userPreferencesService.updateUserPreferences(userId, preferencesDTO);
      return res.status(200).json(updatedPreferences);
    } catch (error) {
      return res.status(500).json({ error: JSON.stringify(error, null, 2) });
    }
  }
}
