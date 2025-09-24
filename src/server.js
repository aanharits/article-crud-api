const app = require("./index.js");

if (require.main === module) {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

module.exports = app;
