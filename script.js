const btnEl=document.getElementById("btn");
const appEl = document.getElementById("app");

getNotes().forEach((notes) => {
    const noteEl = createNoteEl(notes.id,notes.content);
    appEl.insertBefore(noteEl,btnEl);
});


// function to create Text area Dynamically



function createNoteEl(id,content){
   const element = document.createElement("textarea")
   element.classList.add("note")
   element.placeholder ="Empty Note"
   element.value = content

   element.addEventListener("dblclick",()=>{
    const warning = confirm("Do you wanna DELETE the note?")
    if(warning){
        deleteNote(id, element)
    }
   })

   element.addEventListener("input",()=>{
    updateNote(id, element.value)
   });

   return element;
}


// function to delete the note (Text area)




 function deleteNote(id, element){
    const notes = getNotes().filter((note)=>note.id != id)
    saveNote(notes)
    appEl.removeChild(element);
}

//function is updtaeNote that means the text that is typed in the text area should be displayed ....

function updateNote(id, content){
    const notes = getNotes()
    const target = notes.filter((notes)=>notes.id == id)[0];
    target.content = content;
    saveNote(notes);

}

// function that is used to add notes

function addNote(){

    const notes = getNotes();


    const noteObj = {
        id: Math.floor( Math.random() * 100000),
        content:"",
    };
    const noteEl = createNoteEl(noteObj.id, noteObj.content)

    appEl.insertBefore(noteEl,btnEl);

    notes.push(noteObj);

    saveNote(notes)

}
// function that save the note



function saveNote(notes){
    localStorage.setItem("note-app",JSON.stringify(notes));
}

// after refreshing the page to retrive the note from local storage



function getNotes(){
   return  JSON.parse(localStorage.getItem("note-app") || "[]");

}

btnEl.addEventListener("click",addNote)












