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

# commt 2.2.2

### Серверная часть

- Создан **/middleware/authMiddleware.ts**
- Создан **/modules/User.ts**
- Создан **/routes/auth.ts** и **/routes/user.ts**

### Клиентская часть

- Создан скелет **/components/Header.tsx**
- Создан скелет **/components/Main.tsx**
- Создан скелет **/pages/HomePage.tsx**
- Создан скелет **/pages/LoginPage.tsx**
- Создан скелет **/pages/RegisterPage.tsx**

# commit 3.3.2

### Серверная часть

- Роут авторзации теперь помимо токена, возвращает информацию о пользователе

### Клиентская часть

- Создан компонент **/components/Header.tsx**
- Заданы базовые стили и переменные в **index.css**

# commit 3.4.2

- Создан компонент **/components/UserCard.tsx** и добавлен в Header
- Создан скелет **/components/skeletons/UserCardSkeleton.tsx** для компонента **/components/UserCard.tsx** и добавлен в Header
- Создан кастомный HOOK **/hooks/useAuth.ts** через который мы можем передавать JWT состояние.

# commit 4.4.2

### Серверная часть

- Убрано многое кол-во console.log и aletrs, чтобы не перегружать консоль

### Клиентская часть

- Изменены и добавленны некоторые svg
- Почти доделан **Header.tsx** 

# commit 4.5.2

- Готова страница **LoginPage.tsx**
- Готова страница **RegisterPage.tsx**

# commit 4.6.2

- Создан и стилизован компонент **Navigation.tsx**

# commit 4.7.2

- Создан скелет **ProfilePage.tsx**
- Создан скелет **UserProfileCard.tsx**