import React, { useState } from 'react';
import AdminCard from './adminCard.js';
import {showAlert} from '../redux/actions';
import {connect} from 'react-redux';
import axios from 'axios';

function Admin(props) {
  function handleChange(event) {
    var temp = user;
    temp[event.target.id] = event.target.value;
    setUser(temp);
    console.log(user);
  }
  function handleMenu(event) {
    var temp = { ...user };
    temp['type'] = event.target.value;
    setUser(temp);
    console.log(user);
  }
  const [user, setUser] = useState({ type: 'administrator' });
  async function addAdmin() {
    try{
      const res = await axios.post('http://localhost:5000/users', user);
      if(res.data.success){
        props.showAlert({shown:true, message:'Added this user',severity:'success'})
        user.username = ''
        user.password = ''
      }
      else
         props.showAlert({shown:true, message:'Couldnt add this user',severity:'error'})   
    }catch(e){
      props.showAlert({shown:true, message:'Couldnt add this user',severity:'error'})   
    }

  }
  const validateForm = ()=>{
    if(user.Username !== '' &user.Password !=='')
      addAdmin();
    else 
      props.showAlert({shown:true, message:'Complete your info',severity:'error'})
  }
  return (
    <div className="tmp-content">
      <AdminCard
        sx={{ padding: '50px' }}
        header={`Create ${user.type} Account`}
        buttonName={`Add ${user.type}`}
        selectedItem={user.type}
        functionOnClick={validateForm}
        functionOnChange={handleChange}
        handleItemChange={(e) => handleMenu(e)}
      />


    </div>
  );
}




export default connect(null, {showAlert})(Admin);
