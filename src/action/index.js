/**
 * Created by frank on 09/08/2017.
 */

export const loginAction = (username,password) => {
    return{
        type:"LOGIN",
        username:username,
        password:password
    }
}

export const areadyLoginAction = (username,password) => {
    return{
        type:"LOGIN_AREADY",
        username:username,
        password:password
    }
}

export const loginSuccessAction = (userDisplayName,token) => {
    return{
        type:"LOGIN_SUCCESS",
        token:token,
        userDisplayName:userDisplayName
    }
}

export const loginFailedAction = () => {
    return{
        type:"LOGIN_FAILED"
    }
}

export const logoutAction = () => {
    return{
        type:"LOGOUT"
    }
}

export const clickHeadMenu = selectedKey => {

    return {
        type:"CLICK_HEAD_MENU",
        key:selectedKey
    }
}

export const menuDataReady = menuData => {
    return{
        type:"MENU_DATA_READY",
        menuData
    }
}

export const menuListRefreshed = menulist => {
    return{
        type:"MENU_LIST_REFRESHED",
        menulist
    }
}

export const addMenuItem = menuitem => {
    return{
        type:"MENU_ITEM_ADDED",
        menuitem
    }
}

export const modifyMenuItem = menuitem => {
    return{
        type:"MENU_ITEM_MODIFIED",
        menuitem
    }
}