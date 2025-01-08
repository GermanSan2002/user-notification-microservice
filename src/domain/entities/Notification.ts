import { Channel } from "../enums/Channel";

export class Notification {
  constructor(
    public id: string,
    public userId: string,
    public recipient: string,
    public message: string,
    public channel: Channel,
    public priority: string,
    public status: string,
    public timestamp: Date
  ) {}
}