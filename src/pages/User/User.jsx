import React, { Component } from 'react'
import { Card, Button, Space, Table, Tag, Modal, Form, Input } from 'antd';
import './user.less'

export default class User extends Component {
    state={
        isModalOpen: false,
        index:-1,
        storeName:'',
        address:'',
        area:'',
        date: [
        {
            key: '1',
            storeName: 'John Brown',
            address: 'New York No. 1 Lake Park',
            area: 100,
        },
        {
            key: '2',
            storeName: 'Jim Green',
            address: 'London No. 1 Lake Park',
            area: 1004,
        },
        {
            key: '3',
            storeName: 'Joe Black',
            address: 'Sidney No. 1 Lake Park',
            area: 124,
        },
],
    }
  showModal = () => {
    this.setState({isModalOpen:true});
  };
  handleOk = () => {
    if(this.state.index===-1){
        this.setState({
        ...this.state,
        date:[...this.state.date,{key:`${this.state.date.length+1}`,storeName:this.state.storeName,address:this.state.address,area:Number(this.state.area)}],
        isModalOpen:false})
        }
        else{
            let a=this.state.date;
            a[this.state.index]={
                key:`${this.state.index+1}`,
                storeName:this.state.storeName,
                address:this.state.address,
                area:Number(this.state.area)
            } 
            this.setState({
        ...this.state,
        date:[...a],
        isModalOpen:false})}
  };

  handleCancel = () => {
    this.setState({...this.state,isModalOpen:false});
  };
  handleChange = (value) => {
    return (event)=>{
        // this.state.index===-1?event.target.value=event.target.value:event.target.value=this.state.date[this.state.index][value];
        this.setState({...this.state,[value]:event.target.value});} 
  }
  editStore=(event)=>{
    this.setState({...this.state,isModalOpen:true,index:Number(event.currentTarget.getAttribute("editkey"))},
    ()=>{
        this.formDom.current.setFieldsValue({storeName:this.state.date[this.state.index].storeName});
        this.formDom.current.setFieldsValue({address:this.state.date[this.state.index].address});
        this.formDom.current.setFieldsValue({area:this.state.date[this.state.index].area});
    });
    
  }
  addStore=()=>{
    this.setState({...this.state,isModalOpen:true,index:-1},
        ()=>{
            this.formDom.current.setFieldsValue({storeName:''});
            this.formDom.current.setFieldsValue({address:''});
            this.formDom.current.setFieldsValue({area:''});
        });
  }
  deleteStore=(event)=>{
    let a=this.state.date;
    a.splice(Number(event.currentTarget.getAttribute("deletekey")),1);
    this.setState({
        ...this.state,
        date:[...a],
        isModalOpen:false})}
  formDom= React.createRef(null);
    render() {
    const columns = [
        {
            title: '??????',
            dataIndex: 'storeName',
            key: 'storeName',
            render: (text) => text,
        },
        {
            title: '??????',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '??????????????????',
            key: 'area',
            dataIndex: 'area',
        },
        {
            title: '??????',
            key: 'action',
            render: (text, record,index) => (
            <Space size="middle">
                <a editkey={index} onClick={this.editStore}>??????</a>
                <a deletekey={index} onClick={this.deleteStore}>??????</a>
            </Space>
            ),
        },
];
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.addStore} >????????????</Button>
                    <Modal centered title="Basic Modal" open={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel} 
                    footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        ??????
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        ??????
                    </Button>]}>
                        <Form
                        ref={this.formDom}
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            autoComplete="off"
                            >
                            <Form.Item
                                label="??????"
                                name="storeName"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                ]}
                            >
                                <Input  onChange={this.handleChange('storeName')}/>
                            </Form.Item>

                            <Form.Item
                                label="??????"
                                name="address"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}
                            >
                                <Input  onChange={this.handleChange('address')} />
                            </Form.Item>

                            <Form.Item
                                label="??????????????????"
                                name="area"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}
                            >
                                <Input  onChange={this.handleChange('area')} />
                            </Form.Item>
                            </Form>
                    </Modal>
                </Card>
                <Table columns={columns} dataSource={this.state.date} />
            </div>
        )
    }
}