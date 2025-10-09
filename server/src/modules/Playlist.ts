import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Music from "./Music";

class Playlist extends Model {
  public id!: number;
  public title!: string;
  public image!: string;
}

Playlist.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  },
  {
    sequelize,
    modelName: "playlist",
    tableName: "playlists",
    timestamps: true,
  }
);

export default Playlist;
