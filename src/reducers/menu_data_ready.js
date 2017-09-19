/**
 * Created by frank on 09/08/2017.
 */

const menu_reducer = (state = {"isLoaded":false},action) => {

    switch (action.type) {
        case 'MENU_DATA_READY':
            return action.menuData;
        case 'CLICK_HEAD_MENU':
            return Object.assign({},state,{selectedHeadKey:action.key});
        default:
            return state
    }

}

export default menu_reducer