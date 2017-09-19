import React, { Component } from 'react';
import { connect } from 'react-redux';

//import logo from './logo.svg';
import './App.css';
import HomeLayout from './layout/HomeLayout';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import MenuList from './component/menu/MenuList';
import Welcome from './component/Welcome';
import MenuItem from './component/menu/MenuItem';
//import PrivateRoute from './component/private_route/PrivateRoute';
import Login from './component/login/Login';
import { menuDataReady,menuListRefreshed } from './action/index';
import {Get} from './service/HttpService';



class App extends Component {


    render() {

        //const {menus} = this.state;
       // console.log(JSON.stringify(this.state.menus));


    const {isLoaded,isAuthenticated} = this.props;

    if(isAuthenticated&&!isLoaded){
            this.props.loadMenus();
        }


    if(!isAuthenticated){

       return(
           <Router>

               <div style={{width:"300px",height:"400px",margin:"0 auto",position: "absolute", left: "40%", top: "30%"}}>
                    <Login/>
               </div>

           </Router>

       );

    }else if(isLoaded) {

        return (
            <Router>

                <HomeLayout>
                    <Route exact path="/" component={Welcome} />
                    <Route  exact path="/menu/list" component={MenuList} />
                    <Route exact path="/menu/item" component={MenuItem} />
                    <Route path="/menu/item/:key" component={MenuItem} />
                </HomeLayout>

            </Router>
        );
    }else

      return (<div>"Loading"</div>);
  }
}

const mapStateToProps = state => {

    return  {isLoaded:state.sys_menu.isLoaded,isAuthenticated:state.auth.isAuthenticated}
}

const mapDispatchToProps = dispatch => {
    return {
        loadMenus: () => {
            Get('http://localhost:9098/example-service/menu',
                res => {
                    const menulist=JSON.stringify(res);
                    let menus=[];
                    menus=res.filter(item => item.parentkey ==='');
                    menus.map(menu => {

                            let sidemenus=[];
                            sidemenus=res.filter(item => item.parentkey === menu.key);

                            sidemenus.map( sidemenu =>{

                                    let menuitems=[];
                                    menuitems=res.filter(item => item.parentkey === sidemenu.key);
                                    sidemenu.children=menuitems;
                                    return menuitems;

                                }
                            )

                            menu.children=sidemenus;

                            return sidemenus;

                        }
                    )

                    dispatch(menuListRefreshed({
                        "menulist":JSON.parse(menulist)
                    }));

                    dispatch(menuDataReady({
                        "menus":menus,
                        "selectedHeadKey":menus[0].key,
                        "selectedSideMenuKey":menus[0].children[0].key,
                        "isLoaded":true
                    }));


                }
                ,err => console.log(err)

            )

        }
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(App)


