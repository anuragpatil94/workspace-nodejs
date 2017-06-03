const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

//Help for the application
//argv: for getting arguments from console
//Command: Define the commands exposed by your application.(command: add, list,remove,read)
//describe: what field does (field:title,body)
//demand: considered as required field for he command
//alias: a shortcut for field

///D:\STUDY\study-node.js\newCourse\notes-app>node app.js --help
///D:\STUDY\study-node.js\newCourse\notes-app>node app.js add --help
var titleOptions = {
    describe: "Title of the Note",
    demand: true,
    alias: 't'
}
var bodyOptions = {
    describe: "Body of the Note",
    demand: true,
    alias: 'b'
}
const argv = yargs
    .command('add', 'Add a new Note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List of all Notes')
    .command('read', 'Read the note with title', {
        title: titleOptions
    })
    .command('remove', 'Remove the note with argument Title', {
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0]; // command from yargs

//command
//D:\STUDY\study-node.js\newCourse\notes-app>node app.js read --title=""
//D:\STUDY\study-node.js\newCourse\notes-app>node app.js add --title="" --body="" or node app.js add -t="" -b="" 
//D:\STUDY\study-node.js\newCourse\notes-app>node app.js remove --title="" 
//D:\STUDY\study-node.js\newCourse\notes-app>node app.js list
if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note Saved Successfully!');
        notes.logNote(note);
    }
    else {
        console.log('Error: A Duplicate Occured- Note title taken');

    }
} else if (command === 'list') {
    var list = notes.getAll();
    list.forEach(function (element) {
        notes.logNote(element);
    }, this);

} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        notes.logNote(note);
    }
    else {
        console.log(`The Note with Title:\"${argv.title}\" was not found`);

    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    if (noteRemoved) {
        console.log(`The Note with Title:\"${argv.title}\" was removed.`);
    }
    else {
        console.log(`The Note with Title:\"${argv.title}\" was not found`);
    }
}
else {
    console.log('Command not available');

}