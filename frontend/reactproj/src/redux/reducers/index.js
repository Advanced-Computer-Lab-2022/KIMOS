import { combineReducers } from 'redux';


const theme = (theme = (localStorage.getItem("theme")==="true")|| false, action) => {
    if(action.type === 'CHANGE_THEME')
    {
        localStorage.setItem("theme", !theme);
        return !theme;
    }
    return theme;
} 


const courses = (courses=[], action) => {
    if(action.type === 'CHANGE_COURSES'){

        console.log(action);
        return action.payload;
    }
    return courses;
}




export default combineReducers({

    theme:theme,
    courses:courses


});