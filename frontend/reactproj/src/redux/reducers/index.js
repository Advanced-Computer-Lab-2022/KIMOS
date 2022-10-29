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

        console.log('reached reducer');
        return action.payload;
    }
    else{
        console.log('reached not');
        
    }
    return rateAndSymbol;
}

const courses = (courses=[], action) => {
    if(action.type === 'CHANGE_COURSES'){


        return action.payload;
    }
    return courses;
}




export default combineReducers({

    theme:theme,
    courses:courses,
    rateAndSymbol:rateAndSymbol


});