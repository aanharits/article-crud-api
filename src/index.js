const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes.js");
const postRoutes = require("./routes/postRoutes.js");

const port = process.env.PORT;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/auth", authRoutes);
app.use("/api", postRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;
