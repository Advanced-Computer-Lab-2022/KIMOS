import { combineReducers } from 'redux';


const theme = (theme = (localStorage.getItem("theme")==="true")|| false, action) => {
    if(action.type === 'CHANGE_THEME')
    {
        localStorage.setItem("theme", !theme);
        return !theme;
    }
    return theme;
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

const user = (user={username:"",userType:""}, action) => {
    console.log(user)
    if(action.type === 'LOG_IN'){

        return action.payload;
    }
    return user;
}





export default combineReducers({

    theme:theme,
    courses:courses,
    rateAndSymbol:rateAndSymbol,
    userType:userType,
    user:user


});