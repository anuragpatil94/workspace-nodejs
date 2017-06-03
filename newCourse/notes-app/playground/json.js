// var obj={
//     name:"Anurag"
// };

// //Object to String
// var stringObj=JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// var personString = '{"name":"Anurag","age":22}';
// //string to JSON
// var person=JSON.parse(personString);

// console.log(typeof person);
// console.log(person);

const fs=require('fs');

var originalNote={
    title: 'Some Title',
    body: 'Some Body'
};
//object to string
var originalNoteString=JSON.stringify(originalNote);
fs.writeFileSync('notes.json',originalNoteString);

//string to object
var noteString=fs.readFileSync('notes.json');
var note=JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);
