import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Storie from "./Storie";

class Friend extends Model {
  public id!: number;
  public userId!: number;
  public friendId!: number;
  public friendFirstname!: string;
  public friendLastname!: string;
  public friendAvatar!: string | null;
  public friendOnline!: boolean;
  public stories!: Storie[];
}

Friend.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    friendId: { type: DataTypes.INTEGER, allowNull: false },
    friendFirstname: { type: DataTypes.STRING, allowNull: false },
    friendLastname: { type: DataTypes.STRING, allowNull: false },
    friendAvatar: { type: DataTypes.STRING },
    friendOnline: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "friend",
    tableName: "friends",
    timestamps: true,
  }
);

export default Friend;
