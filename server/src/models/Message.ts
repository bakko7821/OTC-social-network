import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";

class Message extends Model {
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public content!: string;
  public read!: boolean;
  public createdAt!: Date;
}

Message.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    senderId: { type: DataTypes.INTEGER, allowNull: false },
    receiverId: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    read: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "message",
    tableName: "messages",
    timestamps: true,
  }
);

User.hasMany(Message, { as: "sentMessages", foreignKey: "senderId" });
User.hasMany(Message, { as: "receivedMessages", foreignKey: "receiverId" });

Message.belongsTo(User, { as: "sender", foreignKey: "senderId" });
Message.belongsTo(User, { as: "receiver", foreignKey: "receiverId" });

export default Message;
