import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Group extends Model {
  public id!: number;
  public userId!: number;
  public groupName!: string;
  public groupUsername!: string;
  public groupAvatar!: string | null;
  public groupSubs!: number;
}

Group.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    groupName: { type: DataTypes.STRING, allowNull: false },
    groupUsername: { type: DataTypes.STRING, allowNull: false },
    groupAvatar: { type: DataTypes.STRING },
    groupSubs: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "group",
    tableName: "groups",
    timestamps: true,
  }
);

export default Group;
