const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/users.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/test", require("./routes/test.routes"));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});