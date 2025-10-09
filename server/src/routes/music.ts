import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import Music from "../modules/Music";

const router = Router();

// Настройка хранения
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../utils/music")); // куда сохранять
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// POST /api/music/upload
router.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Файл не загружен" });
    }

    // Сохраняем путь к файлу в базе
    const { title, author } = req.body;
    const filePath = `/music/${req.file.filename}`; // маршрут для фронта

    const music = await Music.create({
      title,
      author,
      image: "",  // можно добавить позже
      file: filePath,
    });

    res.json({ message: "Файл загружен", music });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
