import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey,red } from "@mui/material/colors";import axios from "axios";
import {IconButton} from "@mui/material";
import MainNote from "./mainNote";
import DownloadIcon from '@mui/icons-material/Download';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import SecondaryBtn from "./buttons/secondaryBtn";
import PrimaryBtn from "./buttons/primaryBtn";






const Sidebar = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
    onUpdateNote,
    downloadPdf,
    handleSave
  }) => {
    const sortedNotes = notes.sort((a, b) => b.createdAt - a.createdAt);
  
    return (
      <div className="notes-sidebar">
        <div className="notes-sidebar-header">
            <div className="notes-sidebar-header-title">
            <h1>My notes</h1>
            <PrimaryBtn btnText="Save" function={handleSave} ></PrimaryBtn>
            </div>
            <div>
            <IconButton className='sidebarBtn' onClick={downloadPdf} >
                <DownloadIcon fontSize="small" />
            </IconButton>
            <IconButton className='sidebarBtn' onClick={onAddNote} >
                <AddCircleSharpIcon fontSize="small" />
            </IconButton>
            </div>
        </div>
        <div className="notes-sidebar-notes">
          {sortedNotes.map(({ _id, title, body, lastEdit }, i) => (
            <div className='note-sidebar-notes' key={i}>
            <div
              className={`notes-sidebar-note ${i === activeNote && "active"}`}
              onClick={() => setActiveNote(i)}
            >
              <div className="sidebar-note-title">
                <strong>{title}</strong>
                <IconButton className='sidebar-note-deleteBtn' onClick={(e)=>onDeleteNote(i)}  aria-label="delete">
                    <DeleteIcon fontSize="small" sx={{color:activeNote==i?'white':'grey'}} />
                </IconButton>
              </div>
  
              <p>{body && body.substr(0, 40) + "..."}</p>
              <small className="note-meta">
                Last Modified{" "}
                {new Date(lastEdit).toLocaleDateString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
            {i==activeNote && <MainNote activeNote={notes[activeNote]} onUpdateNote={onUpdateNote} />}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Sidebar;