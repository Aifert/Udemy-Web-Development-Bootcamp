// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
import express from "express";
import axios from "axios";

const port = 3000;
const app = express();
const url = "https://secrets-api.appbrewery.com/random";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try{
        const result = await axios.get(url);
        const response = result.data;
        const content = JSON.stringify(response.secret);
        const username = JSON.stringify(response.username);
        res.render("index.ejs", {
            secret : content,
            user : username
        });
    }
    catch(error){
        res.render("index.ejs", {
            secret : JSON.stringify(error.response.data),
            user : ""
        });
    }
})

app.listen(port, () =>{
    console.log("server successfully started on port :" + port);
})