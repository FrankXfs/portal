/**
 * Created by frank on 07/08/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Layout, Breadcrumb,Row,Col,Icon } from 'antd';
import HeaderMenu from './HeaderMenu';
import SiderMenu from './SiderMenu';
import { withRouter } from 'react-router'
import { logoutAction } from '../action/index';
//import style from '../styles/HomeLayout.less';


const { Header, Content, Sider } = Layout;

class HomeLayout extends React.Component{

    constructor(props){
        super(props);



        this.state={
            collapsed: false
        };


    }


    onCollapse = (collapsed) => {

        this.setState({ collapsed });
    }

    onLogout =()=>{
        this.props.handleLogout();
    }




    render(){

        const {children} = this.props;



        return (
            <Layout>
                <Header className="header">
                    <Row>
                        <Col span={1}><div className="logo" /></Col>
                        <Col span={22}><HeaderMenu/></Col>
                        <Col span={1}><span style={{"white-space":"nowrap","color":"#FFF"}} >Hello {sessionStorage.getItem("userDisplayName")}&nbsp;<a href="/" onClick={this.onLogout}><Icon type="logout"/></a></span></Col>
                    </Row>



                </Header>
                <Breadcrumb style={{ margin: '5px 12px' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        style={{ background: '#fff' }}
                    >
                        <SiderMenu />


                    </Sider>
                    <Layout>

                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 624 }}>
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }

}

const mapStateToProps = (state,ownProps) => {

    return {a:1};//state.sys_menu;
    //return  Object.assign({},ownProps,state.menu_data);
}

const mapDispatchToProps = dispatch => {
    return {
        handleLogout: () => {
            dispatch(logoutAction())
        }
    }
}


//const AppContainer = connect(
//    mapStateToProps
//)(App)

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HomeLayout))

