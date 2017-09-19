/**
 * Created by frank on 09/08/2017.
 */

const menu_data = (state = {},action) => {

    switch (action.type) {
        case 'MENU_LIST_REFRESHED':
            return Object.assign({},state,action.menulist);
        case 'MENU_ITEM_ADDED': {
            //console.log(JSON.stringify(state));
            return Object.assign({},state, {menulist:[...state.menulist,action.menuitem]});
        }
        case 'MENU_ITEM_MODIFIED': {
            //console.log(JSON.stringify(state));
            return Object.assign({},state, {menulist:[...(state.menulist.filter(item => item.id !== action.menuitem.id)),action.menuitem]});
        }
        default:
            return state
    }

}

export default menu_data