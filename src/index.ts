import express from "express"
import cors from "cors"
import { connectToDB } from "./connect";

connectToDB()
const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})