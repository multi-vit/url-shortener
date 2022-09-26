import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import urlRouter from "./routes/url.js";
import db from "./models/index.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.use("/api/shorturl", urlRouter);

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

db.mongoose
  .connect(db.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
