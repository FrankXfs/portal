/**
 * Created by frank on 08/08/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Menu , Icon } from 'antd';
import { clickHeadMenu } from '../action/index';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'

class HeaderMenu extends React.Component{



    render(){
        const {menuItems,selectedKey,handleHeadMenuChange} = this.props;

        return (
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[selectedKey]}
                    style={{ lineHeight: '64px' }}
                    onSelect={handleHeadMenuChange}
                >
                    {
                        menuItems.map((menuitem) =>
                            <Menu.Item key={menuitem.key}>
                                <Link key={menuitem.key+menuitem.link}  to={menuitem.link}>
                                {menuitem.icon !== undefined && menuitem.icon !== "" ?  <Icon type={menuitem.icon}/>:""}
                                {menuitem.title}
                                </Link>
                                </Menu.Item>
                        )
                    }

                </Menu>
        );
    }

}

const mapStateToProps = (state,ownProps) => {

    //console.log("mapStateToProps="+JSON.stringify(state));
    return  { "menuItems":state.sys_menu.menus
             ,"selectedKey":state.sys_menu.selectedHeadKey
        };
}

const mapDispatchToProps = dispatch => {
    return {
        handleHeadMenuChange: ({item, key, selectedKeys}) => {
            dispatch(clickHeadMenu(key))
        }
    }
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderMenu))

