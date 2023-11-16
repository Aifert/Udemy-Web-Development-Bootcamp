import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var message = "Enter your name below"

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {Message : message});
});

app.post("/submit", (req, res) => {
  var num = 0;
  num = req.body["fName"].length + req.body["lName"].length;
  if(num === 0){
    ;
  }
  else{
    message = `Your name is ${num} letters long`;
  }
  res.render("index.ejs", {
    Message : message,
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
