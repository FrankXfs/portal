/**
 * Created by frank on 09/08/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import {  Button,Popconfirm } from 'antd';
import { Form ,Input ,TreeSelect} from 'antd';
import {Put,Post} from '../../service/HttpService';
import { addMenuItem,modifyMenuItem } from '../../action/index';

const FormItem = Form.Item;
//import { Link } from 'react-router-dom';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
};

class MenuItem extends React.Component{

    state = {
        confirmDirty: true
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(values.parentkey === undefined || values.parentkey==="") {
                    values.parentkey = "";
                    values.type = "head_menu_item";
                }else if(values.parentkey.length===4){
                    values.type = "side_menu";
                }else{
                    values.type = "side_menu_item";
                }
                values.id=values.key;
                if(this.props.menuitem === undefined) {
                    Post("http://localhost:9098/example-service/menu", values,
                        (result) => {
                            if (result.key) {
                                alert('添加菜单成功,key=' + result.key);
                                this.props.handleSave(result);
                                this.props.history.go(-1);
                            } else {
                                alert('添加失败');
                            }
                        }
                        ,
                        (err) => console.log(err)
                    )
                }else{
                    Put("http://localhost:9098/example-service/menu", values,
                        (result) => {
                             //console.log(JSON.stringify(result));
                            if (result.key) {
                                alert('修改菜单成功,key=' + result.key);
                                this.props.handleModify(result);
                                this.props.history.go(-1);
                            } else {
                                alert('修改失败');
                            }
                        }
                        ,
                        (err) => console.log(err)
                    )

                }
                console.log('Received values of form: ', values);
            }
        });
    }

    handleCancel = () => this.props.history.go(-1);

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { menuitem,nonLeafMenusTree } = this.props;

        return (<div><h1>{ menuitem!==undefined?"修改":"新增" }菜单项</h1>
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...formItemLayout}
                    label="菜单编号"
                    hasFeedback
                >
                    {getFieldDecorator('key', {
                        initialValue:(menuitem!==undefined? menuitem.key:''),
                        rules: [{
                            required: true, message: '菜单编号不能为空!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input disabled={menuitem!==undefined? true:false} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标题"
                    hasFeedback
                >
                    {getFieldDecorator('title', {
                        initialValue:(menuitem!==undefined? menuitem.title:''),
                        rules: [{
                            required: true, message: '标题不能为空!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="图标"
                    hasFeedback
                >
                    {getFieldDecorator('icon', {
                        initialValue:(menuitem!==undefined? menuitem.icon:''),

                    })(
                        <Input/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="链接"
                    hasFeedback
                >
                    {getFieldDecorator('link', {
                        initialValue:(menuitem!==undefined? menuitem.link:''),

                    })(
                        <Input/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="父菜单"
                >
                    {getFieldDecorator('parentkey', {
                        initialValue: (menuitem!==undefined? menuitem.parentkey:'')
                    })(
                        <TreeSelect
                            allowClear
                            treeData={nonLeafMenusTree}
                            placeholder="Please select"

                        />
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit">保存</Button>&nbsp;
                    <Popconfirm title="你确定要放弃吗?" onConfirm={this.handleCancel}>
                        <Button type="danger">
                            取消
                        </Button>
                    </Popconfirm>
                </FormItem>


            </Form>

        </div>)
    }

}

const MenuItemForm = Form.create()(MenuItem);

const mapStateToProps = (state,ownProps) => {

    let nonLeafMenusList=JSON.parse(JSON.stringify(state.menu_data.menulist.filter(item => item.type !== "side_menu_item")).replace(/key/g, "value").replace(/title/g,"label"));


    let nonLeafMenusTree=[];
    nonLeafMenusTree=nonLeafMenusList.filter(item => item.parentvalue ==='');
    nonLeafMenusTree.map(menu => {

            let sidemenus=[];
            sidemenus=nonLeafMenusList.filter(item => item.parentvalue === menu.value);
            menu.children=sidemenus;
            return sidemenus;

        }
    );

    if( ownProps.match.params.key!==undefined )
    return  {menuitem:state.menu_data.menulist.filter(item => item.key === ownProps.match.params.key)[0],
             nonLeafMenusTree:nonLeafMenusTree};

    return {nonLeafMenusTree:nonLeafMenusTree};
}

const mapDispatchToProps = dispatch => {
    return {
        handleSave: (menuitem) => {
            dispatch(addMenuItem(menuitem))
        },
        handleModify:(menuitem) =>{
            dispatch(modifyMenuItem(menuitem))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MenuItemForm)

