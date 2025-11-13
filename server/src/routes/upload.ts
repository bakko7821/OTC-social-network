import express from "express";
import { upload } from "../middleware/multer"

const router = express.Router();

router.post("/avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Файл не загружен" });
  }

  const filePath = `/uploads/${req.file.filename}`;
  return res.json({ message: "Файл загружен", path: filePath });
});

export default router;
