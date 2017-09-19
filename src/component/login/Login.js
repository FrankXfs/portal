/**
 * Created by frank on 15/08/2017.
 */
import React from 'react';
import { loginAction } from '../../action/index';
import {
    Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import {GetToken} from '../../service/LoginService';
import {Form, Icon, Input, Button, Checkbox} from 'antd'

const FormItem = Form.Item;

class Login extends React.Component {


    handleSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleLogin(values.userName,values.password);
            }
        });

    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { getFieldDecorator } = this.props.form;
        const { isAuthenticated,isInLoing } =this.props;
        //const { redirectToReferrer } = this.state

        if(isInLoing){
            return (
                <div>Login in process!</div>
            )
        }else

        if (isAuthenticated) {
            return (
                <Redirect to={from}/>
            )
        }


        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a>register now!</a>
                </FormItem>
            </Form>
        )
    }
}

const mapStateToProps = state => {

    return  {isAuthenticated:state.auth.isAuthenticated,isInLoing:state.auth.isInLoing}
}

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: (username,password) => {
            dispatch(loginAction(username,password));
            GetToken(username,password,dispatch);
        }
    }
}


export default withRouter(Form.create()(connect(mapStateToProps,mapDispatchToProps)(Login)));