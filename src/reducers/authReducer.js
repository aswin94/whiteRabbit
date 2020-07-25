const initState = {
    authErrorLogin: '',
    auth: false,
}

const authReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'AUTH_FAILURE':    
            return {
                auth: false,
                authErrorLogin: 'Login Failed',
            }
        
        case 'LOGIN_SUCCESS':
            return {
                auth: true,
                authErrorLogin: 'Login Success',
            }

        default:  
            return state;
    }
}

export default authReducer