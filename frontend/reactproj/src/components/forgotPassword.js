import TextField from '@mui/material/TextField';
import PrimaryButton from './buttons/primaryBtn';
import { useState } from 'react';


const forgotPasssword = () => {

    const [email,setEmail] = useState('');

    // const handleChange = ()=>{
    //     return;
    // }

    const handleSubmit = (e)=>{
      //  e.preventDefault();
        // axios.put('https://httpbin.org/put', { hello: 'world' })
        console.log(`Email ${email} submitted`);
    }

    return ( 
        <div className="forgotPassword">
            <div className="forgotPassword__form" style={{padding:20}}>
                <p>Enter the email address associated with your account and we will send you a link to reset your password.</p>
                
                <TextField style={{margin:'auto', width:'250px'}} label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
                <PrimaryButton function={handleSubmit} btnText="Continue"/>  
            </div>
                
           
        </div>
     );
}
 
export default forgotPasssword;