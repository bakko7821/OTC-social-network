import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Gift extends Model {
  public id!: number;
  public giftImage!: string;
  public userId!: number;
  public friendId!: number;
  public friendFirstname!: string;
  public friendLastname!: string;
  public friendAvatar!: string | null;
}

Gift.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    giftImage: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    friendId: { type: DataTypes.INTEGER, allowNull: false },
    friendFirstname: { type: DataTypes.STRING, allowNull: false },
    friendLastname: { type: DataTypes.STRING, allowNull: false },
    friendAvatar: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "gift",
    tableName: "gifts",
    timestamps: true,
  }
);

export default Gift;
