import db from "../models/index.js";
import dns from "node:dns";

const Url = db.url;
//Regex to remove protocol from URL
const REPLACE_REGEX = /^https?:\/\//i;

export function createAndSaveUrl(req, res) {
  console.log(
    `The req.body.url is: ${req.body.url}` || "There is no req.body!"
  );
  //Use built in URL method to check if URL is valid format (e.g. https://www.google.co.uk)
  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };
  if (isValidUrl(req.body.url)) {
    //Use regex variable to remove protocol
    let splitUrl = req.body.url.replace(REPLACE_REGEX, "");
    //Use .split method to remove anything after the / so we have a pure domain for lookup
    let urlArray = splitUrl.split("/");
    splitUrl = urlArray[0];
    console.log(`The parsed URL is ${splitUrl}`);
    //Use dns.lookup to check domain name is valid
    dns.lookup(splitUrl, async (err, address, family) => {
      if (err) {
        console.log(err);
        res.json({ error: "invalid url" });
      } else {
        console.log("address: %j family: IPv%s", address, family);
        console.log("Valid URL");
        //Check if URL already exists in DB
        Url.find({ original_url: req.body.url })
          .then((data) => {
            console.log(data);
            if (data.length > 0) {
              res.json({
                original_url: data[0].original_url,
                short_url: data[0].short_url,
              });
            } else {
              //Check how many documents are in the DB
              Url.find()
                .then((data) => {
                  console.log(`There are ${data.length} documents in the DB`);
                  //Create and save URL if it doesn't already exist, returning response to user
                  let newUrl = new Url({
                    original_url: req.body.url,
                    short_url: data.length + 1,
                  });
                  newUrl
                    .save(newUrl)
                    .then((data) => {
                      console.log(data);
                      return data;
                    })
                    .catch((err) => {
                      console.log(
                        err.message ||
                          "Some error occurred while creating the URL."
                      );
                    });
                  res.json({
                    original_url: newUrl.original_url,
                    short_url: newUrl.short_url,
                  });
                })
                .catch((err) => {
                  console.log(
                    err.message ||
                      "Some error occurred while retrieving the count of URLs."
                  );
                });
            }
          })
          .catch((err) => {
            console.log(
              err.message || "Some error occurred while retrieving the URLs."
            );
          });
      }
    });
  } else {
    res.json({ error: "invalid url" });
  }
}

export function findUrl(req, res) {
  console.log(`The number is: ${req.params.number}`);
  //Convert the number from params into Number data type and use it to search the database
  Url.find({ short_url: Number(req.params.number) })
    .then((data) => {
      console.log(data);
      //Redirect user to original URL relating to that short number
      res.redirect(data[0].original_url);
    })
    .catch((err) => {
      console.log(
        err.message || "Some error occurred while retrieving the URL."
      );
    });
}
