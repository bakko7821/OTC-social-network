import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Post extends Model {
    public id!: number;
    public ownerId!: number;
    public postText!: string;
    public postImage!: string;
    public likes!: number;
    public comments!: number;
    public shares!: number;
}

Post.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
    postText: { type: DataTypes.STRING },
    postImage: { type: DataTypes.STRING },
    likes: { type: DataTypes.INTEGER },
    comments: { type: DataTypes.INTEGER },
    shares: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: "post",
    tableName: "posts",
    timestamps: true,
  }
);

export default Post