import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "aifert",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

async function getItems(){
  const result = await db.query("SELECT id, task as title FROM items");
  let items = [];
  result.rows.forEach((item) => items.push(item));
  return items;
}

app.get("/", async (req, res) => {
  const items = await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;

  try{
    await db.query("INSERT INTO items (task) VALUES ($1)", [item]);
  }
  catch(error){
    console.error(error.message);
  }
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const new_task = req.body.updatedItemTitle;
  const item_id = parseInt(req.body.updatedItemId);

  console.log(new_task);

  console.log(item_id);

  try{
    await db.query("UPDATE items SET task = ($1) where id = ($2)", [new_task, item_id]);
  
    res.redirect("/");
  }
  catch(error){
    console.error(error.message);
  }
});

app.post("/delete", async (req, res) => {
  const item_id = parseInt(req.body.deleteItemId);

  try{
    await db.query("DELETE from items where id = ($1)", [item_id]);
  }
  catch(error){
    console.error(error.message);
  }
  

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
