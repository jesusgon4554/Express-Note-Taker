const fs = require("fs")
const express = require ("express");
const path = require("path");
let notes = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(express.static("public"));

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
        // increase id every time note is added
        const newNoteId= notes[notes.length -1].id + 1
        newInput.id = newNoteId;
    }
    
    console.log(newInput);
    notes.push(newInput);
    console.log(notes);
// writing the new note into the db.json file
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(newInput);
});

app.delete('/api/notes/:id', function(req,res){
    const id= parseInt(req.params.id);
    console.log(id);
    // filtering through for chosen id
    const newInputs= notes.filter((note) => {
        // only return the other notes that are not = to the chosen id
        return note.id !== id;
    });
    // rewrite the db.json file with the new inputs, so this should not include the deleted note
    fs.writeFileSync("./db/db.json", JSON.stringify(newInputs));
    notes = newInputs;
    res.json(newInputs);
});
app.listen(PORT, function(){
    console.log("Listening on PORT:" + PORT);
});