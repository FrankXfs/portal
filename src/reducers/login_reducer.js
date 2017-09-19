/**
 * Created by frank on 15/08/2017.
 */
const login_reducer = (state = {"isAuthenticated":false,"isInLoing":false},action) => {

    switch (action.type) {
        case 'LOGIN':
            //sessionStorage.setItem('isAuthenticated',"true");
            return Object.assign({},state,{"isInLoing":true});
        case 'LOGIN_SUCCESS':
            sessionStorage.setItem('current_user_token',action.token);
            sessionStorage.setItem('userDisplayName',action.userDisplayName);
            return {"isInLoing":false,"isAuthenticated":true};
        case 'LOGIN_FAILED':
            sessionStorage.removeItem("current_user_token");
            sessionStorage.removeItem("userDisplayName");
            return {"isInLoing":false,"isAuthenticated":false};
        case 'LOGOUT':
            sessionStorage.removeItem("current_user_token");
            sessionStorage.removeItem("userDisplayName");
            return {"isInLoing":false,"isAuthenticated":false};
        case 'LOGIN_AREADY':

            return {"isInLoing":false,"isAuthenticated":true};
        default:
            return state
    }

}

export default login_reducer