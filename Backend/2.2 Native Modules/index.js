const fs = require("fs");

// fs.writeFile("message.txt", "Hello WORLD", (err) => {
//     if(err) throw err;
//     console.log("This file has beeb saved!");
// } )

fs.readFile("message.txt", 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
})