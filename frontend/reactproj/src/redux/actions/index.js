export const setCourses = (value) =>{
    return {
        type:'CHANGE_COURSES',
        payload: value
    }
}

export const setRate = (value) =>{

    
    return {
        type:'CHANGE_RATE',
        payload: value
    }
}
export const setUserType = (value) =>{

    
    return {
        type:'CHANGE_USER-TYPE',
        payload: value
    }
}


export const setUser = (value) =>{

    
    return {
        type:'LOG_IN',
        payload: value
    }
}

export const changeTheme = () =>{

    
    return {
        type:'CHANGE_THEME'
    }
}
