import express from "express";
import Post from "../modules/Post";
import User from "../modules/User";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "username", "firstname", "lastname"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findAll({
      where: { ownerId: id },
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "username", "firstname", "lastname"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
