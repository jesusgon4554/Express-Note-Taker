const fs = require("fs")
const express = require ("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


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
    let notes = res.sendFile(path.join(__dirname, "/db/db.json"))
    notes.push(req.body);
    fs.writeFileSync(path.join(__dirname + "/db/db.json")), JSON.stringify(notes);
    res.end();
});

app.delete("/api/notes:note", (req,res) =>{
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname,"/db/db.json")));
    let newNote = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname + "/db/db.json")), JSON.stringify(newNote);
    res.end();
});

app.listen(PORT, function(){
    console.log("Listening on PORT:" + PORT);
});