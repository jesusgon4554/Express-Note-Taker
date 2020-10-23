const fs = require("fs")
const express = require ("express");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use("/assets", express.static("public/assets"));

let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
app.get('/notes', (req, res) => {
    //gets notes.html and displays on page
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.get('/', (req, res) => {
    //gets index.html and displays on page
    res.sendFile(path.join(__dirname + '/public/index.html'))
});

app.get('/api/notes', (req, res) => {
    //this displays notes in the db
    res.sendFile(path.join(__dirname, "db/db.json"))
});


app.post("/api/notes", (req, res) => {
    const newInput = req.body;
    if (notes.length ===0) {
        newInput.id = 1;
    } else {
        // increase id number by 1 each time theres a new note
        const newNoteId= notes[notes.length -1].id + 1
        newInput.id = newNoteId;
    }
    // see if newInput working properly
    console.log(newInput);
    notes.push(newInput);
    console.log(notes);
// writing the new note into the db.json file
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(newInput);
});

app.delete("/api/notes/:id", (req,res) =>{
    let id = JSON.parse(fs.readFileSync(path.join(__dirname,"/db/db.json")));
    let newNote = notes.filter((note) =>{
        return notes.id !== id;
    });
    fs.writeFileSync(path.join(__dirname + "/db/db.json")), JSON.stringify(newNote);
    notes = newNote;
    res.json(newNote);
});

app.listen(PORT, function(){
    console.log("Listening on PORT:" + PORT);
});