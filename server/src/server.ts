import server from "./app";
import { sequelize } from "./config/db";
import "./modules"; // важная строчка — создаёт связи

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models synchronized");
  } catch (error) {
    console.error("Database sync failed:", error);
  }
})();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
