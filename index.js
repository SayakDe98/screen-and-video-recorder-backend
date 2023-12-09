const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.route");
const fileRoutes = require("./routes/file.route");
require("./startup/db")();
const port = process.env.port || 4000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
// app.use(
//   router.get("/", async (req, res) =>
//     res.send("Welcome to screen recorder app!")
//   )
// );

app.get("/", async (req, res) => res.send("Welcome to screen recorder app!!!!"));
app.listen(port, () => {
    console.log("Listening on port: ", port);
});