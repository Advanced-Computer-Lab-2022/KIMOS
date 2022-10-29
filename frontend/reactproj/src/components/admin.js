import React, { useState } from 'react';
import AdminCard from './adminCard.js';
import axios from 'axios';

function Admin() {
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
  const [user, setUser] = useState({ type: 'Admin' });
  function addAdmin() {
    axios.post('http://localhost:5000/users/admin/addUser', user).then(() => {});
  }
  return (
    <div className="tmp-content">
      <AdminCard
        sx={{ padding: '50px' }}
        header={`Create ${user.type} Account`}
        buttonName={`Add ${user.type}`}
        selectedItem={user.type}
        functionOnClick={addAdmin}
        functionOnChange={handleChange}
        handleItemChange={(e) => handleMenu(e)}
      />
      {/* <AdminCard
        header={'Create Instructor Account'}
        buttonName={'Add Instructor'}
        functionOnClick={addInstructor}
        functionOnChange={handleChange}
      />
      <AdminCard
        header={'Create Trainee Account'}
        buttonName={'Add Trainee'}
        functionOnClick={addCorporateTrainee}
        functionOnChange={handleChange}
      /> */}
    </div>
  );
}

export default Admin;
