import { Frequency } from "../../domain/enums/Frequency";
import { Channel } from "../../domain/enums/Channel";

export interface NotificationPreferencesDTO {
  userId: string;
  alertTypes: string[]; // IDs de AlertType
  frequency: Frequency;
  preferredChannels: Channel[];
  doNotDisturb: boolean;
}
