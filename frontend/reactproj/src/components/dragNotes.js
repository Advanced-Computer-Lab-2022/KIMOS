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
import ReactModal from 'react-modal-resizable-draggable';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';


import * as React from 'react';


function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

function TakeNotes2({videoId,courseId}) {
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(-1);
    const [, updateState] = useState();
    const [visibility,setVisibility] = useState('hidden');
    const notesRef = useRef(null);

    // useEffect(() => {
    // localStorage.setItem("notes", JSON.stringify(notes));
    // }, [notes]);

    useEffect(()=>{

        axios.get(`http://localhost:5000/courses/notes?videoId=${videoId}&courseId=${courseId}`) // notes related to this student and this video
        .then(res=>{
            console.log(res);
            if(res.data.success){
                console.log("here");
                setNotes(res.data.payload.notes);
            }
        }).catch(e=>{
            console.log(e);
        })
    },[]);

    const handleSave=()=>{
        axios.post(`http://localhost:5000/courses/notes?videoId=${videoId}&courseId=${courseId}`,{notes})   // notes related to this student and this video
        .then((res)=>{
            if(res.data.success){
                setFeedbackMsg("Notes Saved.");
                setSeverity('success');
                setOpen(true);
            }else{
                setFeedbackMsg("Couldn't save your notes, please try again.");
                setSeverity('error');
                setOpen(true);
            }
        })
        .catch((e)=>{
            setFeedbackMsg("Couldn't save your notes, please try again.");
            setSeverity('error');
            setOpen(true);
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
        lastEdit: Date.now(),
        createdAt: Date.now()
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


    const modalContent = ()=>{
        return (
            <div className="takeNotes" style={{width:'100%'}}>
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
        )
    }

    const [notesModal, setNotesModal] = useState(false);
    const handleClickOpenNotes = ()=>{
        setNotesModal(true);
    }
    const handleCloseNotes = ()=>{
        setNotesModal(false);

    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpenNotes}>
                Open draggable dialog
            </Button>
            <Dialog
                open={notesModal}
                onClose={handleCloseNotes}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                maxWidth='xs'
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Your Notes
                </DialogTitle>
                <DialogContent>
                    {modalContent()}
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleCloseNotes}>
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>




        </div>


        
    );
}

export default TakeNotes2;