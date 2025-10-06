# OTC Social Network – commit 1.1.1

**Дата:** 2025-10-06  
**Описание:** Начальная сборка проекта. Подготовлена архитектура на основе MVC, настроены Docker-контейнеры, сервер и клиент.

---

## 🧩 Технологический стек

### **Клиент (Frontend)**
- **Vite** — сборщик и dev-сервер  
- **React + TypeScript** — фронтенд-фреймворк и типизация  
- **Socket.IO Client** — обмен сообщениями в реальном времени  

### **Сервер (Backend)**
- **Node.js + Express** — REST API  
- **TypeScript** — строгая типизация  
- **Socket.IO** — реал-тайм соединение (чаты, уведомления)  
- **PostgreSQL** — основная база данных  
- **Sequelize** — ORM для работы с БД  
- **JWT (jsonwebtoken)** — авторизация  
- **bcrypt** — хэширование паролей  
- **dotenv** — управление переменными окружения  
- **cors** — настройка кросс-доменных запросов  

---

## 🐳 Docker

Настроен контейнерный запуск для всего приложения:  
- **server** — Node.js приложение  
- **client** — фронтенд (Vite)  
- **db** — PostgreSQL (версия 16)  

Сборка и запуск выполняются через `docker-compose up --build`.

---

## ⚙️ Установленные зависимости

```bash
# Backend
npm install express dotenv cors bcrypt jsonwebtoken socket.io sequelize pg pg-hstore
npm install -D typescript ts-node nodemon @types/node @types/express @types/cors @types/jsonwebtoken

# Frontend
npm install
npm install socket.io-client
```

# commit 1.1.2

- Удален Docker