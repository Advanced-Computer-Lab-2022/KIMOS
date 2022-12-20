import { useEffect, useState,useRef } from "react";
import MainNote from "./mainNote";
import Sidebar from "./sideBarNotes";
import ReactMarkdown from "react-markdown";
import jsPDF from 'jspdf';
import SecondaryBtn from "./buttons/secondaryBtn";
import PrimaryBtn from "./buttons/primaryBtn";
import {useReactToPrint} from 'react-to-print';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import * as React from 'react';


function takeNotes2({videoId,courseId}) {
    const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
    );
    const [activeNote, setActiveNote] = useState(-1);
    const [, updateState] = useState();
    const [visibility,setVisibility] = useState('hidden');
    const notesRef = useRef(null);

    useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    useEffect(()=>{
        axios.get(`https://localhost:5000/courses/notes?videoId=${videoId}&courseId=${courseId}`) // notes related to this student and this video
        .then(res=>{
            if(res.ok){
                setNotes(res.data.notes)
            }
        }).catch(e=>{
            console.log(e.error);
        })

    });

    const handleSave=()=>{
        axios.post(`https://localhost:5000/courses/notes?videoId=${videoId}&courseId=${courseId}`,notes)   // notes related to this student and this video
        .then(()=>{
            if(res.ok){
                if(res.ok){
                    setFeedbackMsg("Notes Saved.");
                    setSeverity('success');
                }else{
                    setFeedbackMsg("Couldn't save your notes, please try again.");
                    setSeverity('error');
                }
                setOpen(true);
            }
        })
    }

    const [open, setOpen] = useState(false);
    const [severity,setSeverity] = useState("");
    const [feedbackMsg,setFeedbackMsg] = useState("");

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };



    const onAddNote = () => {
        const newNote = {
                                // removed id as it will be added in the database
        title: "Untitled Note",
        body: "",
        lastModified: Date.now(),
        created: Date.now()
        };

        setNotes([newNote, ...notes]);
        if(activeNote!==0){
            setActiveNote(0); /// changed from newnote id to the index of the new note int the array
        }else{
            updateState({});
        }
    };

    const onDeleteNote = (idx) => { //will delete by idx and not by id
        var newNotes = [...notes] ;
        newNotes.splice(idx, 1);
        setNotes(newNotes);
        // setNotes(notes.filter(({ id }) => id !== noteId));
    };

    const onUpdateNote = (updatedNote) => {
        const updatedNotesArr = notes.map((note,i) => {
        if (i === activeNote) {
            return updatedNote;
        }

        return note;
        });

        setNotes(updatedNotesArr);
    };

    



    const downloadPdf =()=>{
        var doc = new jsPDF();
        setVisibility('visible');
        doc.html(notesRef.current,{
        callback: (doc)=> {doc.save("myNotes.pdf");setVisibility('hidden')},
        margin : [10,10,10,10],
        autoPaging :'text',
        x:0,
        y:0,
        width:190,
        windowWidth:675
        }
        );
    }




    return (
        <div className="takeNotes">
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {feedbackMsg}
            </Alert>
        </Snackbar>
        <Sidebar
            notes={notes}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            onUpdateNote={onUpdateNote}
            downloadPdf={downloadPdf}
            handleSave={handleSave}
        />
        {/* <MainNote activeNote={getActiveNote()} onUpdateNote={onUpdateNoteli} /> */}
        {/* <PrimaryBtn btnText="Download notes" function={downloadPdf2}/> */}
            <div style={{visibility:visibility,position: "absolute", top: 1000, left: 0}}>
                <div  ref={notesRef}>
                    {notes.map((note)=>(
                        <div>
                            <h1 className="preview-title">{note.title}</h1>
                            <ReactMarkdown >
                                {note.body}
                            </ReactMarkdown>
                        </div>
                    ))
                        
                    }
                </div>
            </div>
        </div>
        
    );
}

export default takeNotes2;