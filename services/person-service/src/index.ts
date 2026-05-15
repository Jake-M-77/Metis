import { PrismaClient } from "@prisma/client/extension";
import express from "express";
import cors from "cors";
import personRoutes from "./routes/person.routes.js";
import commsRoutes from "./routes/comms.routes.js";
import warningMarkersRoutes from "./routes/warningMarkers.routes.js";
import bailConditionsRoutes from "./routes/bailConditions.routes.js";
import personDescriptionsRoutes from "./routes/personDescriptions.routes.js";
import personAliasesRoutes from "./routes/personAliases.routes.js";
import custodyPhotosRoutes from "./routes/custodyPhotos.routes.js";
import personDocumentsRoutes from "./routes/documents.routes.js";
import personInfoRoutes from "./routes/personInfo.routes.js";
import personAssociationRoutes from "./routes/personAssociations.routes.js";


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

app.use("/", commsRoutes)

app.use("/", warningMarkersRoutes)

app.use("/", bailConditionsRoutes)

app.use("/", personDescriptionsRoutes)

app.use("/", personAliasesRoutes)

app.use("/", custodyPhotosRoutes)

app.use("/", personDocumentsRoutes)

app.use("/", personInfoRoutes)

app.use("/", personAssociationRoutes)



export const server = app.listen(PORT, () => {
    console.log(`Person service runnin on port ${PORT}`);
});