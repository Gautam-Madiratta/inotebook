import React, { useState,useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note , setnote] = useState({title:"",description:"",tag:""});

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag)
    setnote({title:"",description:"",tag:""})
  };

  const onchange=(e)=>{
    setnote({...note,[e.target.name]: e.target.value })
  }
  return (
    <div className="container my-4">
      <h1>Add Your Notes</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onchange} value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            id="description"
            onChange={onchange}  value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" >
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            name="tag"
            id="tag"
            onChange={onchange} value={note.tag}
          />
        </div>
       
        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
}
