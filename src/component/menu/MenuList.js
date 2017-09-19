/**
 * Created by frank on 08/08/2017.
 */
import React from 'react';
import { Table ,Button, Icon} from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const columns = [{
    title: '菜单编码',
    dataIndex: 'key',
    key: 'key',
    render:(text, record) => (
        <span>
          <Link to={"/menu/item/"+record.key}>{text}</Link>
        </span>
     )
}, {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
}, {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
}, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
}, {
    title: '链接',
    dataIndex: 'link',
    key: 'link',
}, {
    title: '父菜单',
    dataIndex: 'parentkey',
    key: 'parentkey',
}];

class MenuList extends React.Component{
    state = {
        selectedRowKeys: [],  // Check here to configure the default column
        loading: false,
    };
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render(){

        const {menulist} = this.props;
        const { loading,selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;


        return (
            <div>
               <div style={{ margin: '5px 0px','textAlign':'right' }}>
                   <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items ` : ''}</span>
                    <Button
                        type="danger"
                        onClick={this.start}
                        disabled={!hasSelected}
                        loading={loading}
                    >
                        <Icon type='delete'/>Delete
                    </Button>
                   <span>&nbsp;</span>
                   <Link to="/menu/item">
                   <Button
                           type="primary"

                       >
                        <Icon type='plus'/>Add
                    </Button>
                   </Link>

               </div>

                <Table rowSelection={rowSelection} columns={columns} dataSource={menulist}  />
            </div>

        );
    }


}

const mapStateToProps = (state,ownProps) => {

    return  {menulist:state.menu_data.menulist};
}


export default connect(mapStateToProps)(MenuList)

