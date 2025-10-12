import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";

class FriendRequest extends Model {
  public id!: number;
  public senderId!: number;   // кто отправил
  public receiverId!: number; // кому
  public status!: "pending" | "accepted" | "rejected";
}

FriendRequest.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    senderId: { type: DataTypes.INTEGER, allowNull: false },
    receiverId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "friend_request",
    tableName: "friend_requests",
    timestamps: true,
  }
);

// связи для удобства
FriendRequest.belongsTo(User, { foreignKey: "senderId", as: "sender" });
FriendRequest.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

export default FriendRequest;
