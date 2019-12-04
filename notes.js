const fs = require('fs');

var fetchNotes = () => {
    try{
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch(e){
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

var addNote = (title,body) => {
    
    var notes = fetchNotes();
    
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);
    
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var readNote = (title) => {
    var notes = fetchNotes();
    var searchedNotes = notes.filter((note) => note.title === title);
    return searchedNotes[0];
};

var removeNote = (title) => {
    
    var notes = fetchNotes();
 
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    if(notes.length !== filteredNotes.length){
        return true;
    } else {
        return false;
    }

    //fetch notes
    //filter notes
    //save new notes
    
};
var logNote = (note) => {
    debugger;
    console.log('---');
    console.log(`title: ${note.title}`);
    console.log(`body: ${note.body}`);  
};

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote,
    logNote
};

