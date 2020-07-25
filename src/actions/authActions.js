export const signIn = (credentials) => {
    const userData = {
        username: 'aswin',
        password: 'aswin94'
    };
    return (dispatch, getState) => {
        if (userData.username===credentials.username && userData.password===credentials.password) {
            dispatch({type: 'LOGIN_SUCCESS'})
        } else dispatch({type: 'AUTH_FAILURE'});
    }
}