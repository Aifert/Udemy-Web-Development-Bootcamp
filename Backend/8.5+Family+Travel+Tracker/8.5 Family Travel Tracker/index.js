import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "aifert",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

function insertUser(user_name, user_color){
  try{
    db.query("INSERT INTO users (username, color) VALUES ($1,$2)", [user_name, user_color]);
  }
  catch(error){
    console.log(error.message);
  }
}

async function checkUser(){
  const result = await db.query("SELECT userid as id,username as name,color FROM users");
  let users = [];
  result.rows.forEach((user) => users.push(user));
  return users;
}

async function checkVisisted(currentUserId) {
  const result = await db.query("SELECT country_code FROM visited_countries where userid = ($1)", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getColor(users){
  const currentUser = users.find((user) => user.id === currentUserId);
  return currentUser.color;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted(currentUserId);
  console.log(countries);
  const users = await checkUser();
  const currentColor = await getColor(users);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentColor
  });
});


app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    const check = await db.query("SELECT userid, country_code FROM visited_countries WHERE userid = $1 AND country_code = $2", [currentUserId, countryCode]);
    if(check.rows.length > 0){
      console.log("ENTRY ALREADY EXISTS");
    }
    else{
      try {
        await db.query(
          "INSERT INTO visited_countries (userid,country_code) VALUES ($1, $2)",
          [currentUserId, countryCode]
        );
        res.redirect("/");
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if(req.body.add){
    res.render("new.ejs");
  }
  else{
    currentUserId = parseInt(req.body.user);
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.htm
  const name = req.body.name;
  const color = req.body.color;

  insertUser(name, color);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
