import express from "express"
import cors from "cors"
import { connectToDB } from "./connect.ts";
import taskRoutes from "./resources/Task/routes.ts"
import { errorHandler } from "./resources/Error/errorHandler.ts";

connectToDB()
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRoutes)
const port = 3000;

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})