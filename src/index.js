const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const postRoutes = require("./routes/postRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use('/api', postRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
