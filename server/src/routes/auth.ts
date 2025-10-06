import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../modules/User";

const router = express.Router();

// Регистрация
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Имя пользователя обязательно"),
    body("firstname").notEmpty().withMessage("Имя обязательно"),
    body("lastname").notEmpty().withMessage("Фамилия обязательна"),
    body("email").isEmail().withMessage("Некорректный email"),
    body("password").isLength({ min: 6 }).withMessage("Минимум 6 символов"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { firstname, lastname, username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: "Пользователь уже существует" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ firstname, lastname, username, email, password: hashedPassword });

      res.status(201).json({ message: "Пользователь создан", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

// Авторизация
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").notEmpty(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(400).json({ message: "Неверный email или пароль" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Неверный email или пароль" });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

export default router;
