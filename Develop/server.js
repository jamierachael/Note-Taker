const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
var http = require("http");
var JsonDB = require("node-json-db");

// For node-JSON-db
// Installed this: 
// https://www.npmjs.com/package/node-json-db

// - needs for path.join 

const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
// Is this neccessary? 

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Test 
// app.get("/", (request, response) => {
//     response.send("Test!");
// })

// Do we need this? 
// Might need a server call for styles.css and index.js
// // Read file needed for notes.html?
// fs.readFile("public/notes.html", "utf8", function (error, data) {

//     if (error) {
//         return console.log(error);
//     }
//     console.log(data);
// });

// // Read file needed for index.html?
// fs.readFile("public/index.html", "utf8", function (error, data) {

//     if (error) {
//         return console.log(error);
//     }
//     console.log(data);
// });

// Get/notes - needs to return notes.html
app.get("/notes", (request, response) => {

    response.sendFile(path.join(__dirname, "public", "notes.html"));
    console.log("Your Notes!");
})

// Get * - needs to return index.html (?)

app.get("/", (request, response) => {
    // response.sendFile(path.join(__dirname, "..", "..", "index.html"));
    response.sendFile(path.join(__dirname, "public", "index.html"));
    console.log("Your index!");
})

// GET /api/notes
// Should read the db.json file and return all saved notes as JSON.db
// How?

// Working, console logs object 
app.get("/api/notes", (request, response) => {

    fs.readFile(path.join(__dirname, "db", "db.json"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
    })
})


// POST /api/notes -  Should recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

app.post("/api/notes", function (request, response) {
    //     // Is this neccessary ? 
    //     // var newNote = request.body;
    // res.send('POST request to the note page!')
    var db = new JsonDB(new Config("myDataBase", true, false, '/'));
    console.log("Api notes" + db);

});

// DELETE /api/notes/:id 
//  Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

// app.delete("/api/notes/:id", function (req, res) {
//   res.send('DELETE notes!')
// })


// Server listening confirmation
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

