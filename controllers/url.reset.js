import db from "../models/index.js";

function resetDb() {
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

  db.url
    .remove({})
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(
        err.message || "Some error occurred while retrieving the URL."
      );
    });
}

resetDb();
