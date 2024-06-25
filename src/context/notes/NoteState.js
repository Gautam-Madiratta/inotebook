import { React, useState } from "react";
import NoteContext from "./NoteContext";
// const noteContext = createContext();

export default function NoteState(props) {
  const host = "http://localhost:5000"
  const defaultNotes = []
  const [notes, setNotes] = useState(defaultNotes);

  //get notes
  const getNotes = async()  => {
    //server side logic : Api call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
      });
      const json = await response.json()
      setNotes(json)
  };

  
  //Add a note
  const addNote = async (title, description, tag) => {

    //server side logic : Api call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
        body: JSON.stringify({title,description,tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note));
  };


  //Delete a note
  const deleteNote = async (id) => {

    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });

    setNotes(
      notes.filter((n) => {
        return n._id !== id;
      })
    );
  };


  //Edit a note
  const editNote = async (id, title, description, tag) => {

    //Api call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });

    

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to delete from client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);

  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, setNotes,getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}
