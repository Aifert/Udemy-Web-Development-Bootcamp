import express from "express";
import bodyParser from "body-parser";
import Client from "pg";

const app = express();
const port = 3000;

const db = new Client({
  user : "postgres",
  host : "localhost",
  database : "flags",
  password : "aifert",
  port : 5432,
})

db.connect();

let totalCorrect = 0;
let quiz = [];


db.query("SELECT * FROM users", (err, res) => {
  if(err){
    console.error("error", err.stack);
  }
  else{
    quiz = res.rows;
  }
})

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
