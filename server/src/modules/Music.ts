import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Music extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public image!: string;
  public file!: string;
}

Music.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    file: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  },
  {
    sequelize,
    modelName: "music",
    tableName: "musics",
    timestamps: true,
  }
);

export default Music;
