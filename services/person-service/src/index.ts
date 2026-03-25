import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Person Service Running");
});

app.listen(PORT, () => {
    console.log(`Person service runnin on port ${PORT}`);
});