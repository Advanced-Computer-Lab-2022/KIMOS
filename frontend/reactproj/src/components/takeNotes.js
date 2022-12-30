import { useEffect , useState, useRef } from "react";
import { Stack, ThemeProvider } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { grey } from "@mui/material/colors";import axios from "axios";
import { useFormControl } from '@mui/material/FormControl';
import {Typography,FormControl,IconButton,Box,Button} from "@mui/material";
import SecondaryBtn from "./buttons/secondaryBtn";
import PrimaryBtn from "./buttons/primaryBtn";






const takeNotes = () => {
    const [newNote,setNewNote] = useState("");
    const [notes,setNotes] = useState([]);
    const [readOnly,setReadOnly] = useState([]);
    const [focused,setFocused] = useState([]);
    const ref = React.createRef();

    


    const handleEdit = (idx)=>{
        var newReadOnly = readOnly;
        newReadOnly[idx]=false;
        setReadOnly(newReadOnly);
        var newFocused = focused;
        newFocused[idx]=true;
        setFocused(newFocused);
    }

    const handleDelete = (idx)=>{ // must be sent directly to backend
        var newNotes = notes;
        newNotes.splice(idx, 1);
        setNotes(newNotes);
    }
    
    const handleSave = (event)=>{
        //console.log(event.target.value)
        //axios.post(`http://localhost/5000/saveNote`,{note})
    }

    const handleKeyPress = (event)=>{
        console.log(event);
    }

    return (  
        <Stack spacing={2}   >
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex' }} >
                <PrimaryBtn btnText="Save notes" function={handleSubmit} ></PrimaryBtn>
                    <TextField
                        id="outlined-multiline-flexible"
                        //label="title"
                        value={notes}
                        multiline
                        maxRows={5}
                        inputProps={{ style: { color: "black" }}}
                        //inputRef={input => input && input.focus()}
                        onKeyUp={handleKeyPress}
                        //onFocus={handleFocus}
                        //sx={{width:1}}
                        sx={{my:1,width:1}}
                    >
                    </TextField>
                    
                </Box>
                {/* {show[0] &&<PrimaryBtn btnText="Save" function={handleSubmit} ></PrimaryBtn>} */}
            </form>


            {/* <Typography component="h1" variant="h5" color="primary">
                My Notes:
            </Typography> */}
            {notes.map((note,idx)=>{
                <div>
                <Box>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Multiline"
                    multiline
                    maxRows={5}
                    inputProps={{ style: { color: "black" } , readOnly:true }} 
                    //inputRef={input => input && input.focus()}
                    defaultValue={note.text}
                />
                <IconButton onClick={()=>handleEdit(idx)} aria-label="edit">
                    <EditIcon fontSize="small" sx={{ color: grey }} />
                </IconButton>
                <IconButton onClick={()=>handleDelete(idx)}  aria-label="delete">
                        <DeleteIcon fontSize="small" sx={{ color: grey }} />
                    </IconButton>
                </Box>
                {/* {show[idx] &&<PrimaryBtn  type="submit" btnText="Save" function={handleSave} ></PrimaryBtn>} */}
                </div>
            })}
            
        </Stack>

    );
}
 
export default takeNotes;