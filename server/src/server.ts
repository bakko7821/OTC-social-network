import server from "./app";
import {sequelize} from "./config/db";
import User from "./modules/User";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });
    console.log("All models synchronized");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
