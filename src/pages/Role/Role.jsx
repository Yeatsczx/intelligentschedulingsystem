import React, { Component } from 'react'
import { Card, Button, Space, Table, Tag, Modal, Form, Input } from 'antd';
import axios from 'axios';
import store from'../redux/store'
import { json } from 'react-router-dom';

export default class Role extends Component {
    state={
        isModalOpen: false,
        index:-1,
        employeeName:'',
        position:'',
        telephone:'',
        shop:'',
        preference:'',
        date: [
        // {
        //     key: '1',
        //     employeeName: 'John Brown',
        //     position: 'Store manager',
        //     telephone: 100121231231,
        //     shop:'新都',
        //     preference:'周一上班',
        // },
],
    }
    componentDidMount(){
    let employeeInformationMap={};
    // eslint-disable-next-line array-callback-return
    this.overallData=store.getState();
    let employeeInformationArray=this.overallData.flat(Infinity).filter(item=> {
        if(!employeeInformationMap[item.employeeName]){
            employeeInformationMap[item.employeeName]=true;
            return true;
        }
        return false;
    });

    this.setState({...this.state,date:employeeInformationArray});
    }
    UNSAFE_componentWillUpdate(){
        store.dispatch({type:'',data:this.overallData});
    }
  showModal = () => {
    this.setState({isModalOpen:true});
  };
  handleOk = () => {
    let name,name1;
    if(this.state.index===-1){
        this.setState({
        ...this.state,
        date:[...this.state.date,
            {key:`${this.state.date.length+1}`,
            employeeName: this.state.employeeName,
            position: this.state.position,
            telephone: Number(this.state.telephone),
            shop:this.state.shop,
            preference:this.state.preference,}],
            isModalOpen:false})
        }
        else{
            let a=this.state.date;
            name=a[this.state.index].employeeName;
            a[this.state.index]={
                key:`${this.state.index+1}`,
                employeeName: this.state.employeeName,
                position: this.state.position,
                telephone: Number(this.state.telephone),
                shop:this.state.shop,
                preference:this.state.preference,
            } 
            name1=a[this.state.index].employeeName;
            this.setState({
        ...this.state,
        date:[...a],
        isModalOpen:false})}
        for(let i=0;i<12;i++){
        for(let j=0;j<this.overallData[i].length;j++){
            this.overallData[i][j].forEach(item=>{
                if(item.employeeName===name){
                    item.employeeName=name1;
                }
            })
        }
    }
    // console.log(JSON.stringify(this.overallData));
  };

  handleCancel = () => {
    this.setState({...this.state,isModalOpen:false});
  };
  handleChange = (value) => {
    return (event)=>{
        this.setState({...this.state,[value]:event.target.value});} 
  }
  editStore=(event)=>{
    this.setState({...this.state,isModalOpen:true,index:Number(event.currentTarget.getAttribute("editkey"))},
    ()=>{
        this.formDom.current.setFieldsValue({employeeName:this.state.date[this.state.index].employeeName});
        this.formDom.current.setFieldsValue({position:this.state.date[this.state.index].position});
        this.formDom.current.setFieldsValue({telephone:this.state.date[this.state.index].telephone});
        this.formDom.current.setFieldsValue({shop:this.state.date[this.state.index].shop});
        this.formDom.current.setFieldsValue({preference:this.state.date[this.state.index].preference});
        this.setState({...this.state,employeeName:this.state.date[this.state.index].employeeName,position:this.state.date[this.state.index].position,telephone:this.state.date[this.state.index].telephone,shop:this.state.date[this.state.index].shop,preference:this.state.date[this.state.index].preference})
    });
    
  }
  addStore=()=>{
    this.setState({...this.state,isModalOpen:true,index:-1},
        ()=>{
        this.formDom.current.setFieldsValue({employeeName:''});
        this.formDom.current.setFieldsValue({position:''});
        this.formDom.current.setFieldsValue({telephone:''});
        this.formDom.current.setFieldsValue({shop:''});
        this.formDom.current.setFieldsValue({preference:''});
        this.setState({...this.state,employeeName:'',position:'',telephone:'',shop:'',preference:''})
        });
  }
  deleteStore=(event)=>{
    let a=this.state.date;
    let name=a.splice(Number(event.currentTarget.getAttribute("deletekey")),1)[0].employeeName;
    for(let i=0;i<12;i++){
        for(let j=0;j<this.overallData[i].length;j++){
            let array=[];
            this.overallData[i][j].forEach(item=>{
                if(item.employeeName!==name){
                    array.push(item);
                }
            });
            this.overallData[i][j]=[...array];
        }
    }
    // console.log(JSON.stringify(this.overallData));
    this.setState({
        ...this.state,
        date:[...a],
        isModalOpen:false})}
  formDom= React.createRef(null);
    render() {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'employeeName',
            key: 'employeeName',
            render: (text) => text,
        },
        {
            title: '住址',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: '电话',
            key: 'telephone',
            dataIndex: 'telephone',
        },
        {
            title: '工作门店',
            key: 'shop',
            dataIndex: 'shop',
        },
        {
            title: '偏好',
            key: 'preference',
            dataIndex: 'preference',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record,index) => (
            <Space size="middle">
                <a editkey={index} onClick={this.editStore}>编辑</a>
                <a deletekey={index} onClick={this.deleteStore}>删除</a>
            </Space>
            ),
        },
];
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.addStore} >新增员工</Button>
                    <Modal centered title="Basic Modal" open={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel}
                    footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        确认
                    </Button>]}>
                        <Form
                        labelAlign="left"
                        ref={this.formDom}
                            name="basic"
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            autoComplete="off"
                            >
                            <Form.Item
                                label="姓名"
                                name="employeeName"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                ]}
                            >
                                <Input  onChange={this.handleChange('employeeName')}/>
                            </Form.Item>

                            <Form.Item
                                label="职位"
                                name="position"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}
                            >
                                <Input  onChange={this.handleChange('position')} />
                            </Form.Item>

                            <Form.Item
                                label="电话"
                                name="telephone"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}
                            >
                                <Input  onChange={this.handleChange('telephone')} />
                            </Form.Item>
                            <Form.Item
                                label="工作门店"
                                name="shop"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}
                            >
                                <Input  onChange={this.handleChange('shop')} />
                            </Form.Item>
                            <Form.Item
                                label="偏好"
                                name="preference"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}
                            >
                                <Input  onChange={this.handleChange('preference')} />
                            </Form.Item>
                            </Form>
                    </Modal>
                </Card>
                <Table columns={columns} dataSource={this.state.date} />
            </div>
        )
    }
}