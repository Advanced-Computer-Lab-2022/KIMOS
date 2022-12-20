import TextField from '@mui/material/TextField';
import PrimaryButton from './buttons/primaryBtn';
import { useState } from 'react';
import { Container, padding } from '@mui/system';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const PasswordReset = () => {
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [email, setEmail] = useState('');
  const [failed, setFailed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  const handleSubmit = () => {
    //console.log(oldPass);
    axios
      .post(`http://localhost:5000/users/passwordReset/token=${token}`, {
        password: pass1
      })
      .then((res) => {
        console.log(res.message);
        console.log(res.status);
        navigate('/');
      })
      .catch((err) => {
        console.log(err.message);
        setFailed(true);
        setErrorMsg('Wrong Email');
      });
  };

  return (
    <div className="changePassword">
      <div className="changePassword__form" style={{ padding: 20 }}>
        {/* <TextField
          style={{ margin: '10px', width: '250px' }}
          required
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        /> */}

        <TextField
          style={{ margin: '10px', width: '250px' }}
          required
          type="password"
          label="New Password"
          variant="outlined"
          onChange={(e) => setPass1(e.target.value)}
        />
        <TextField
          style={{ margin: '10px', width: '250px' }}
          required
          type="password"
          label="Confirm New Password"
          variant="outlined"
          onChange={(e) => setPass2(e.target.value)}
        />
        {/* {pass1!==pass2 &&  <div className="changePassword__form__noMatch"> Confirmed New Password doesn't match New Password. </div>} */}
        {failed && <div className="changePassword__form__noMatch"> {errorMsg}</div>}
        <Button
          onClick={handleSubmit}
          variant="contained"
          // size={this.props.btnSize}
          disabled={pass1 !== pass2}
          className="changePassword__form__primary-btn">
          {'Reset'}
        </Button>
        {/* <p style={{padding:"10px"}}>hi</p> */}
      </div>
    </div>
  );
};

export default PasswordReset;
