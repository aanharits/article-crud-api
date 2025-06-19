const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes.js");
const postRoutes = require("./routes/postRoutes.js");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use('/api', authRoutes);
app.use('/api', postRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
