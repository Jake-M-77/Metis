import { PrismaClient } from "@prisma/client/extension";
import express from "express";
import personRoutes from "./routes/person.routes.js";

const app = express();
const PORT = 3001;

app.use(express.json());


app.get('/', (req, res) => {
    res.send("Person Service Running");
});

app.use("/", personRoutes)

app.listen(PORT, () => {
    console.log(`Person service runnin on port ${PORT}`);
});