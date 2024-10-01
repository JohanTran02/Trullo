import express from "express"
import cors from "cors"
import { connectToDB } from "./connect.ts";
import taskRoutes from "./resources/Task/routes.ts"
import projectRoutes from "./resources/Project/routes.ts"
import authRoutes from "./resources/Auth/routes.ts"
import userRoutes from "./resources/User/routes.ts"
import { errorHandler } from "./resources/Error/errorHandler.ts";

connectToDB()
const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use("/api/tasks", taskRoutes)
app.use("/api/project", projectRoutes)
app.use("/api/users", userRoutes)

const port = 3000;

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})