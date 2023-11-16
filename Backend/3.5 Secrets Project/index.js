//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

var passwordInput = "";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(extractPassword);

function extractPassword(req, res, next){
    console.log(req.body);
    passwordInput = req.body["password"];
    next();
}
app.post("/check", (req, res) => {
    if(passwordInput === "ILOVEPIZZA"){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.sendFile(__dirname + "/public/index.html");
    }
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})


app.listen(port, (req, res) => {
    console.log(`Server successfully running on port ${port}`);
})
