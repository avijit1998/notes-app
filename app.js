const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
 
titleOptions = {
    describe:'Title of note',
    demand:true,
    alias:'t'
};
bodyOptions = {
    describe:'Body of note',
    demand:true,
    alias:'b'
}

const argv = yargs
.command('add','Add a new note',{
    title:titleOptions,
    body:bodyOptions
})
.command('list','List all the notes')
.command('read','Read a note',{
    title:titleOptions
})
.command('remove','Remove a note',{
    title:titleOptions
})
.help()
.argv;
var command = argv._[0];

if(command === 'add'){
 var note=notes.addNote(argv.title ,argv.body);
 if(note){
     console.log('note created');
     notes.logNote(note);
 } else {
     console.log('note already exists with the same title');
     
 }
}
else if(command == 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} node(s).`);
    allNotes.forEach((note) => notes.logNote(note));
}
else if(command == 'read'){
    var note=notes.readNote(argv.title);
    if(note){
        console.log('note found');
        notes.logNote(note);
    } else {
        console.log('note not found');
        
    }
    
}
else if(command == 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved?'note removed':'note not found';
    console.log(message);
    
}
else{
    console.log("command does not exist");
}
