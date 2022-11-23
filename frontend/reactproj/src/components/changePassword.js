import TextField from '@mui/material/TextField';
import PrimaryButton from './buttons/primaryBtn';
import { useState } from 'react';
import { Container, padding } from '@mui/system';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

const changePassword = () => {
    
    const [pass1,setPass1] = useState('');
    const [pass2,setPass2] = useState('');
    const [oldPass,setOldPass] = useState('');
    const [failed,setFailed] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');
    const navigate = useNavigate();

    const user = localStorage.getItem('userData');

    const handleSubmit = ()=>{
        axios.put('http://localhost:5000/users/changePassword', { username:user.username ,oldPassword: oldPass ,newPassword: pass1 })
        .then((res)=>{
            console.log(res.msg);
            if(res.msg!=='Ok'){
                setFailed(true);
                setErrorMsg(res.msg);
            }else{
                navigate('/');
            }
        }).catch((err)=>{
            console.log(err.msg);

            // setFailed(true);
            // setErrorMsg(err);
        })
    }


    return ( 
        <div className="changePassword">
            {!failed && 
                <div className="changePassword__form" style={{padding:20}}>
                    <TextField style={{margin:'auto', width:'250px'}} required label="Old Password" variant="outlined" onChange={(e)=>setOldPass(e.target.value)}/>
                    <TextField style={{margin:'auto', width:'250px'}} required label="New Password" variant="outlined" onChange={(e)=>setPass1(e.target.value)}/>
                    <TextField style={{margin:'auto', width:'250px'}} required label="Confirm New Password" variant="outlined" onChange={(e)=>setPass2(e.target.value)}/>
                    {/* {pass1!==pass2 &&  <div className="changePassword__form__noMatch"> Confirmed New Password doesn't match New Password. </div>} */}
                    <Button onClick={handleSubmit} 
                        variant="contained"
                        // size={this.props.btnSize}
                        disabled={pass1!==pass2}
                        
                        className="changePassword__form__primary-btn">
                        {'Change'}
                    </Button>
                    {/* <p style={{padding:"10px"}}>hi</p> */}
                </div>
            }
            {failed && <div className="changePassword__err"> {errorMsg}</div>}
                
           
        </div>
     );
}
 
export default changePassword;