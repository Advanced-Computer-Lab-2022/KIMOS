export const setCourses = (value) =>{
    return {
        type:'CHANGE_COURSES',
        payload: value
    }
}

export const setRate = (value) =>{
    console.log('reached action');
    
    return {
        type:'CHANGE_RATE',
        payload: value
    }
}