import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface MessageAttributes {
  id: number;
  senderId: number;
  receiverId: number;
  roomId: string;
  content: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Для TypeScript — чтобы можно было создавать без id и времени
interface MessageCreationAttributes extends Optional<MessageAttributes, "id" | "isRead" | "createdAt" | "updatedAt"> {}

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public roomId!: string;
  public content!: string;
  public isRead!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    senderId: { type: DataTypes.INTEGER, allowNull: false, },
    receiverId: { type: DataTypes.INTEGER, allowNull: false, },
    roomId: { type: DataTypes.STRING, allowNull: false, },
    content: { type: DataTypes.TEXT, allowNull: false, },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false, },
  },
  {
    sequelize,
    modelName: "message",
    tableName: "messages",
    timestamps: true,
  }
);

export default Message;
