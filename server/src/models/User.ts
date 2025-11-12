import { DataTypes, Model, HasManyAddAssociationMixin } from "sequelize";
import { sequelize } from "../config/db";

class User extends Model {
  public id!: number;
  public online!: boolean;
  public firstname!: string;
  public lastname!: string;
  public username!: string;
  public phoneNumber!: string;
  public email!: string;
  public password!: string;
  public location!: string;
  public description!: string;
  public headImage!: string;
  public avatarImage!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    online: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    location: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    description: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    headImage: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    avatarImage: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    timestamps: true,
  }
);

export default User;
