/**
 * Created by frank on 08/08/2017.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu , Icon } from 'antd';
import { withRouter } from 'react-router'

const {SubMenu} = Menu;


class SiderMenu extends React.Component{

    render(){
        const {menuItems,selectedKey} = this.props;
        return(

            <Menu key ="side_menu" defaultSelectedKeys={[selectedKey]} mode="inline" style={{ height: '624px'  }}>
                {
                    menuItems.map((item)=>{

                             if(item.children!== undefined && item.children.length > 0){

                                  return(
                                    <SubMenu
                                        key={item.key}
                                        title={<span><Link key={item.key+item.link}  to={item.link}>{item.icon !== undefined && item.icon !== "" ? <Icon type={item.icon}/>:""}<span>{item.title}</span></Link></span>}
                                    >
                                        {
                                            item.children.map((chItem) => {

                                                return (<Menu.Item key={ chItem.key }>
                                                         <Link key={chItem.key+chItem.link}  to={chItem.link}>
                                                            {chItem.icon !== undefined && chItem.icon !== "" ?
                                                                <Icon type={chItem.icon}/> : ""}
                                                            <span>{chItem.title}</span>
                                                         </Link>
                                                        </Menu.Item>
                                                )
                                            })
                                        }


                                       </SubMenu>

                                  )


                            }else{

                                 return(
                                    <Menu.Item key={item.key}>
                                        <Link key={item.key+item.link} to={item.link}>

                                          {item.icon !== undefined && item.icon !== "" ? <Icon key={item.key+item.icon} type={item.icon}/>:""}
                                          <span key={item.key+item.title}>{item.title}</span>

                                        </Link>


                                    </Menu.Item>
                                 )

                            }

                        }

                    )

                }
            </Menu>

        )
    }

}

const mapStateToProps = (state,ownProps) => {

    //console.log("mapStateToProps="+JSON.stringify(state));
    return  { "menuItems":state.sys_menu.menus.filter((item)=> item.key === state.sys_menu.selectedHeadKey)[0].children
        ,"selectedKey":state.sys_menu.selectedSideMenuKey
    };
}




export default withRouter(connect(mapStateToProps)(SiderMenu))

//export default SiderMenu;