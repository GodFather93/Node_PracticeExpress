const express = require("express");
const hb = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

app.set("view engine", "hbs");

app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append the log");
    }
  });

  next();
});

hb.registerPartials(__dirname + "/views/partials");

hb.registerHelper("getcurrentYear", () => {
  return new Date().getFullYear();
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About-Page"
  });
});
app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home_page",
    welcomeMessage: "HellO! Welcome to our page."
  });
});

app.get("/bad", (req, res) => {
  res.send({
    error: 404,
    message: "bad server"
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
