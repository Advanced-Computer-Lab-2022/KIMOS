import React from 'react'
import {connect} from 'react-redux';
import NoAccessPage from './noAccessPage';



function Auth({component, userType, user}) {  
  console.log(userType);
  console.log(user);
  console.log(component);
  if(userType === 'user'){
    if(user.userType === 'corporate trainee' || user.userType === 'individual trainee' )
      return component
  }
  if(userType === user.userType){
    return component
  }
  else{
    return(<NoAccessPage/>)
  }

}


const mapStateToProps = (state) => {
    return {
      user: state.user
    };
  };
  

export default connect(mapStateToProps)(Auth)