import server from "./app";
import { sequelize } from "./config/db";
import User from "./modules/User";

(async () => {
  try {
    await sequelize.sync();
    console.log("All models synchronized");
  } catch (error) {
    console.error("Database sync failed:", error);
  }
})();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
