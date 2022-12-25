import express from "express";
import { userRouter } from "./routes/user.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
