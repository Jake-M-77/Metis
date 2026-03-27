import { PrismaClient } from "@prisma/client/extension";
import express from "express";
import cors from "cors";
import personRoutes from "./routes/person.routes.js";

export const app = express();
const PORT = 3001;

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());


app.get('/', (req, res) => {
    res.send("Person Service Running");
});

app.use("/", personRoutes)

export const server = app.listen(PORT, () => {
    console.log(`Person service runnin on port ${PORT}`);
});