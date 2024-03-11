const app = require("./app");
require("dotenv").config({
    path: [".env", "../.env"]
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}.`));
