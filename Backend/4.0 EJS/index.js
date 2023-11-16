import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// var index = new Date().getDay();
var index = 5;

app.get("/", (req, res) => {
    if(index === 5 || index === 6){
        res.render(__dirname + "/views/index.ejs", {message : "Hey! It's the weeknd,, it's time to have fun!"});    }
    else{
        res.render(__dirname + "/views/index.ejs", {message : "Hey! It's a weekday, it's time to work hard!"});
    }
})

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`);
})




