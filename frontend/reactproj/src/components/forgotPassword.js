import TextField from '@mui/material/TextField';
import PrimaryButton from './buttons/primaryBtn';
import React, { useState } from 'react';
import axios from 'axios';
import { Container, padding } from '@mui/system';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [failed, setFailed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  // const handleChange = ()=>{
  //     return;
  // }
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //  e.preventDefault();
    // axios.put('https://httpbin.org/put', { hello: 'world' })
    axios
      .post(`http://localhost:5000/users/passwordResetEmail`, { email: email })
      .then((res) => {
        console.log(res.message);
        console.log(res.status);
        navigate('/');
      })
      .catch((err) => {
        setFailed(true);
        setErrorMsg('Wrong Email');
      });
  };

  return (
    <div className="forgotPassword">
      <div className="forgotPassword__form" style={{ padding: 20 }}>
        <p>
          Enter the email address associated with your account and we will send you a link to reset
          your password.
        </p>

        <TextField
          style={{ margin: 'auto', width: '250px' }}
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PrimaryButton function={handleSubmit} btnText="Continue" />
      </div>
    </div>
  );
};

export default ForgotPassword;
