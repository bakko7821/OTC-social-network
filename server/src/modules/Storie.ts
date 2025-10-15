import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";

class Storie extends Model {
  public id!: number;
  public userId!: number;
  public image!: string | null;
  public text!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Storie.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    text: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: "storie",
    tableName: "stories",
    timestamps: true, // создаст поля createdAt и updatedAt автоматически
  }
);


export default Storie;
