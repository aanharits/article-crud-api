const express = require("express");
const app = express();
const port = 3000;
const postRoutes = require("./routes/postRoutes.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hai nama saya Farhan Harits Prakoso!");
});

app.use('/api', postRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
