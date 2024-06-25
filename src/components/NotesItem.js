import React,{useContext} from "react";
import NoteContext from "../context/notes/NoteContext";


const NotesItem = (props) => {
  const { note,updateNote } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const onClickMethods= () => {
    deleteNote(note._id)
    props.alert()
  }

  return (
    <div className="col-md-3 ">
      <div className="card my-3" style={{width: "18rem"}}>
        <div className="card-body">

            <div className="d-flex align-items-center">

          <h5 className="card-title"> {note.title}</h5>

          <i className="fa-solid fa-trash-can mx-3" onClick={onClickMethods}></i>
          <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
            </div>

          <p className="card-text">{note.description}</p>
         
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
