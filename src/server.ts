import "dotenv/config";
import "./infra/crons/notification-appointments-day.cron"
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";
import { router } from "./routes/index.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
