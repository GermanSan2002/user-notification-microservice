import { Channel } from "../../domain/enums/Channel";

export interface NotificationDTO {
  id: string;
  userId: string;
  recipient: string;
  message: string;
  channel: Channel;
  priority: string;
  status: string;
  timestamp: Date;
}
