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

# commit 5.8.2

### Серверная часть

- В модель **/modules/User.ts** добавленны параметры [location, description, headImage, avatarImage]
- В **routes/users.ts** добавлен роут получения юзера по id

### Клиентская часть

- Готов компонент **UserProfileCard.tsx**

# commit 5.9.2

- На компоненте **UserProfileCard.tsx** реализованна ленивая загрузка чере компонент **/skeletons/UserProfileCardSkeleton.tsx**

# commit 6.10.2

### Серверная часть.

- Созданы модули **/modules/Music.ts**, **/modules/Playlist.ts**, **/modules/index.ts**
- Установленна библиотека **multer** и добавлен запрос на загрузку музыки **/routes/music.ts**
- В **/routes/user.ts** созданны 2 GET запроса на получние плейлистов и музыки по id.

### Клиентская часть

- Создан компонент **/component/NavigationSection.tsx**
- Создан компонент **/component/MusicSection.tsx**
- Создан компонент **/component/VideoSection.tsx**
- Создан компонент **/component/PhotosSection.tsx**

# commit 6.10.3

- Проверенна возможность добавления трека.

# commit 6.11.3

- Добавлена музыкальная секция

# commit 6.11.4

- Добавленны небольшие изменения в стилях

# commit 7.12.4 (NOT WORKED)

- Изменить модель **Friends.ts**

# commit 8.12.4

- Модель **/modules/Friend.ts** - изменена (передаются: avatarImage, firstname, lastname, status)
- Добавлен роут **/routes/friends.ts** - в нем мы взаимодействуем с заявками из **/modules/FriendRequest.ts**

# commit 8.13.4

- Добавлена ленивая загрузка для компонентов **Navigation.tsx**, **MusicSection.tsx**, **FriendsSection.tsx**

# commit 8.13.5 

- Добавлена стилизация скролла на странице

# commit 9.14.5

### Серверная часть

- Создан **modules/Gift.ts**
- В **routes/users.ts** создан GET запрос на получение подарков пользователя
- Создана папка **src/utils/upload**

### Клиентская часть

- Создан компонент **components/GiftsSection.tsx** и добавлен в **pages/ProfilePage.tsx**

# commit 9.15.6

- Создан скелет для **GiftSection.tsx**
- Добавленны nullMessage, в местах где контента может не быть

# commit 10.16.6

### Серверная часть

- Создан **modules/Group.ts**
- В **routes/users.ts** создан GET запрос на получение подарков пользователя

### Клиентская часть

- Создан компонент **components/GroupsSection.tsx** и добавлен в **pages/ProfilePage.tsx**

# commit 10.17.6

- Создан скелет для **GiftSection.tsx**

# commit 10.17.7

- Небольшие изменения

# commit 11.18.7

### Серверная часть

- Создана модель **Storie.ts**
- Модель **Storie.ts** привязанна к модели **Friend.ts** и модели **User.ts**
- Создан **/routes/stories.ts**, добавлен GET запрос на получение историй и POST запрос на создание истории

### Клиентская часть

- Небольшие изменения в **FeedPage.tsx**
- Создан компонент **SectionsStory.tsx**

# commit 11.19.7

- Добавлен **StoriesSectionSkeleton.tsx**
- Добавлен **PostsSection.tsx**
- Добавлен **LikelyFriendsSection.tsx**

# commit 11.20.7

- Добавлен макет поста в **PostsSection.tsx**

# commit 12.21.7

### Серверная часть

- Создана модель **Post.ts**
- Модель **Post.ts** привязанна к модели **Friend.ts** и модели **User.ts**
- Создан **/routes/posts.ts**, добавлен GET запрос на получение историй

### Клиентская часть

- Готов код на получение всех постов в **PostsSection.tsx**

# commit 12.22.8

- Создана страница **ProfilePostsSection.tsx**
- Страница получает все посты данного пользователя по ID

# commit 12.23.8

- Создан скелет для **ProfilePostsSection.tsx** и **PostSection.tsx**

# commit 12.24.8

- Создан кастомный хук **hooks/useToggleTheme.ts**

# commit 13.24.8 (BASIC)

- Добавлена модель сообщений
- Добвлен роут для получения сообщений
- В server.ts добавлена возможность отправки сообщений через socket.IO

# commit 14.25.8 (REWORK)

### Серверная часть

- Удалены модели
```
server/src/models/Friend.ts
server/src/models/FriendRequests.ts
server/src/models/Gifts.ts
server/src/models/Groups.ts
server/src/models/index.ts
server/src/models/Message.ts
server/src/models/Music.ts
server/src/models/Playlist.ts
server/src/models/Post.ts
server/src/models/Storie.ts
```

- Удалены роуты
```
server/src/routes/friends.ts
server/src/routes/messages.ts
server/src/routes/music.ts
server/src/routes/posts.ts
server/src/routes/stories.ts
```

### Клиентская часть

- Удалены компоненты
```
client\src\components\DropDownMenu.tsx
client\src\components\App.tsx
client\src\components\DropDownMenuMusic.tsx
client\src\components\DropDownNotificationMenu.tsx
client\src\components\FriendsSection.tsx
client\src\components\GiftsSection.tsx
client\src\components\GroupSection.tsx
client\src\components\Header.tsx
client\src\components\LikelyFriendsSection.tsx
client\src\components\MusicSection.tsx
client\src\components\NavigateSection.tsx
client\src\components\Navigation.tsx
client\src\components\PhotosSection.tsx
client\src\components\PostsSection.tsx
client\src\components\ProfilePostsSection.tsx
client\src\components\SearchInput.tsx
client\src\components\SearchInput.tsx
client\src\components\StoriesSection.tsx
client\src\components\UserCard.tsx
client\src\components\UserPostsCard.tsx
client\src\components\VideosSection.tsx
```

- Удалены скелеты компонентов
```
client\src\components\skeletons\FriendsSectionSkeleton.tsx
client\src\components\skeletons\GiftsSectionSkeleton.tsx
client\src\components\skeletons\GroupsSectionSkeleton.tsx
client\src\components\skeletons\MusicSectionSkeleton.tsx
client\src\components\skeletons\NavigationSkeleton.tsx
client\src\components\skeletons\ProfileSectionPostSkeleton.tsx
client\src\components\skeletons\StoriesSectionSkeleton.tsx
client\src\components\skeletons\UserCardSkeleton.tsx
client\src\components\skeletons\UserProfileCardSkeleton.tsx
```

- Удалены страницы
```
client\src\pages\FeedPage.tsx
client\src\pages\HomePage.tsx
```

- Удалены стили
```
client\src\styles\Auth.css
client\src\styles\Feed.css
client\src\styles\Header.css
client\src\styles\index.css
client\src\styles\Navigation.css
client\src\styles\Profile.css
client\src\styles\Sections.css
client\src\styles\Skeletons.css
```

## Репозиторий переиминован с OTC-social-network на OTC-messanger

- Установлен SASS

# commit 14.26.8

- Создана страница MainPage.tsx.
- Созданы компоненты Chats.tsx, Messages.tsx
- Создана механика резайзера

# commit 14.27.8

- Создан компонент **DropDownMenu.tsx**
- Создан компонент **SwitchTheme.tsx**

# commit 14.28.8

- Создан компонент PrivateRoute.tsx
- Создан хук **/hooks/useAuthValue.ts**
- Создан **/providers/AuthContext.ts**

- Создана страница **RegisterPage.tsx**
- Создана страница **LoginPage.tsx**

# commit 15.29.8

### Серверная часть
- Создана модель сообщений /models/Message.ts
- Создан роут сообщений /routes/message.ts
- Настроен Socket.IO

### Клиентская часть
- Созданы компоненты в папке /components/Messages
```
/components/Messages/Messages.tsx
/components/Messages/MessageInput.tsx
/components/Messages/MessageItem.tsx
```
- Созданы файлы в папке /api
```
/api/messages.ts
/api/users.ts
```
# commit 15.30.8 (FIXED)

- При следующем коммите нужно починить вывод информации о собеседнике.

# commit 16.31.8 (FIXED * 2)

- При следующем коммите нужно починить вывод информации о собеседнике.
- При отправке сообщения - в базу отправляется два одинаковых сообщения.

### Серверная часть

- Была попытка изменить POST роут - чтобы он не пропускал дубли. (он не пропускает, если отправить одно и тоже разными сообщениями, но при отправке одного - все равно приходит дублированное сообщение.)

### Клиентская часть

- Стилизована страница MainPage.tsx, теперь все радует глаз

# commit 17.32.8 (Починил дублирование сообщений)

### Серверная часть

- Проблема была с socket.on(privat_message) - чат гпт решил её

### Клиентская чать

- Отправка теперь через useCallback
- Переделанна отрисовка, теперь старые сообщения сверху, а новые снизу, и мы по стандарту находимся снизу.