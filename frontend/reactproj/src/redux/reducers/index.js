import { combineReducers } from 'redux';


const lightTheme = (lightTheme = true, action) => {
    if(action.type === 'CHANGE_THEME')
    {
        localStorage.setItem("theme", !lightTheme);
        return !lightTheme;
    }
    return lightTheme;
} 

const rateAndSymbol = (rateAndSymbol={'rate':1, 'symbol':'$'}, action) => {
    if(action.type === 'CHANGE_RATE'){
        return action.payload;
    }
    else{

        
    }
    return rateAndSymbol;
}

const courses = (courses=[], action) => {
    if(action.type === 'CHANGE_COURSES'){


        return action.payload;
    }
    return courses;
}

const userType = (type='Any', action) => {
    if(action.type === 'CHANGE_USER-TYPE'){


        return action.payload;
    }
    return type;
}

const user = (user={username:"",userType:"",userEmail:"", userId:""}, action) => {
    if(action.type === 'LOG_IN'){
        console.log('payload');

        console.log(action.payload);
        return action.payload;
    }
    return user;
}


const primaryColor = (primaryColor="#D80621", action) => {
    if(action.type === 'CHANGE_COLOR'){
        console.log('changed to '+action.payload.color) 
        // return action.payload.color;
        return '#D80621'
    }
    return '#D80621'
}



const alert = (alert={shown:false, message:'', severity:'info'}, action) => {

    if(action.type === 'SHOW_ALERT'){   
        console.log(action.payload);
        return action.payload;
    }
    if(action.type === 'CLOSE_ALERT')
        return {shown:false, message:alert.message, severity:alert.severity}
    return alert
}





export default combineReducers({

    lightTheme:lightTheme,
    courses:courses,
    rateAndSymbol:rateAndSymbol,
    userType:userType,
    user:user,
    primaryColor:primaryColor,
    alert: alert


});