import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Friends extends Model {
  public id!: number;
  public userId!: number;
  public friendId!: number;
}

Friends.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    friendId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "friend",
    tableName: "friends",
    timestamps: true,
  }
);

export default Friends;
