import React, { Component } from 'react'
import store from'../redux/store'
import './index.less';
import { Card, Button, Space, Table, Tag, Modal, Form, Input } from 'antd';
import people from '../../assets/images/people.jpg';
import people1 from '../../assets/images/people1.jpg';
/*
后台管理的柱状图路由组件
 */
export default class Bar extends Component {
    state={
        i:0,
        j:0,
        m:0,
        n:0,
        isModalOpen:false,
        employeeName:'',
        job:'',
        time:'',
        data:[],
        // jobJudgment:''
    }
    formDom= React.createRef(null);
    UNSAFE_componentWillMount(){
        this.setState({...this.state,data:store.getState(),i:store.getState().i,j:store.getState().j});
    }
    componentDidMount(){
        let obj = document.getElementById("select1");
        for(let i=0;i<=obj.length;i++){
    if(i===this.state.i)
        obj[i].selected = true;
}
let obj2 = document.getElementById("select2");
        for(let i=0;i<=obj2.length;i++){
    if(i===this.state.j)
        obj2[i].selected = true;
}
    }
    handleCancel = () => {
    this.setState({...this.state,isModalOpen:false});
  }
  handleChange = (value) => {
    return (event)=>{
        this.setState({...this.state,[value]:event.target.value})} 
  }
  deepCopyArray=(arr)=> {
                let copiedArr = [];
                for (let i = 0; i < arr.length; i++) {
                    let element = arr[i];
                    if (Array.isArray(element)) {
                        copiedArr[i] = this.deepCopyArray(element);
                    }else {
                        copiedArr[i] = element;
                    }
                }
                return copiedArr;
            }
    // eslint-disable-next-line no-dupe-class-members
handleCancel = () => {
    this.setState({...this.state,isModalOpen:false});
  };
  handleOk=()=>{
    let array=this.state.data;
    if(array[4*(this.state.i-1)+this.state.j-1][this.state.m][this.state.n]){
    array[4*(this.state.i-1)+this.state.j-1][this.state.m][this.state.n].isModalOpen=this.state.isModalOpen;
    array[4*(this.state.i-1)+this.state.j-1][this.state.m][this.state.n].job=this.state.job;
    array[4*(this.state.i-1)+this.state.j-1][this.state.m][this.state.n].time=this.state.time;
    array[4*(this.state.i-1)+this.state.j-1][this.state.m][this.state.n].employeeName=this.state.employeeName;
    }
    else{
            array[4*(this.state.i-1)+this.state.j-1][this.state.m][this.state.n]={};
    array[4*(this.state.i-1)+this.state.j-1][this.state.m][this.state.n].isModalOpen=this.state.isModalOpen;
    array[4*(this.state.i-1)+this.state.j-1][this.state.m][this.state.n].job=this.state.job;
    array[4*(this.state.i-1)+this.state.j-1][this.state.m][this.state.n].time=this.state.time;
    array[4*(this.state.i-1)+this.state.j-1][this.state.m][this.state.n].employeeName=this.state.employeeName;
    }
    this.setState({...this.state,isModalOpen:false,data:array});
    }
    handleClick=(m,n)=>{
        return ()=>{
            this.setState({});
            console.log(this);
            if(this.state.data[4*(this.state.i-1)+this.state.j-1][m][n]){
                this.setState({...this.state,isModalOpen:true,m,n,
                        employeeName:this.state.data[4*(this.state.i-1)+this.state.j-1][m][n].employeeName,
        job:this.state.data[4*(this.state.i-1)+this.state.j-1][m][n].job,
        time:this.state.data[4*(this.state.i-1)+this.state.j-1][m][n].time},()=>{
            this.formDom.current.setFieldsValue({employeeName:this.state.employeeName});
        this.formDom.current.setFieldsValue({job:this.state.job});
        this.formDom.current.setFieldsValue({time:this.state.time});
        });
            } 
            else{
                this.setState({...this.state,isModalOpen:true,m,n});
                this.formDom.current.setFieldsValue({employeeName:''});
        this.formDom.current.setFieldsValue({job:''});
        this.formDom.current.setFieldsValue({time:''});
            }
        }
            
    }
    render() {
        this.date=[];
        for(let i=0;i<29;i++){
            this.date.push(`4月${i}日`)
        }
        return (
            <div>
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
                                label="员工姓名"
                                name="employeeName"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input employeeName!',
                                },
                                ]}
                            >
                                <Input  onChange={this.handleChange('employeeName')}/>
                            </Form.Item>

                            <Form.Item
                                label="工作岗位"
                                name="job"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input job!',
                                },
                                ]}
                            >
                                <Input  onChange={this.handleChange('job')} />
                            </Form.Item>

                            <Form.Item
                                label="工作时间"
                                name="time"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your time!',
                                },
                                ]}
                            >
                                <Input  onChange={this.handleChange('time')} />
                            </Form.Item>
                            </Form>
                    </Modal>
                <select name="" id="select1" className='storeType1' onChange={(event)=>{
                    this.setState({...this.state,i:Number(event.target.value)})
                    store.getState().i=Number(event.target.value);
                    store.dispatch({type:'',data:store.getState()});
                }}>
                    <option value="0">请选择门店</option>
                    <option value="1" >中国石油西南石油大学科技园加油站排班表</option>
                    <option value="2">中国石油新都天府加油站员工排班表</option>
                    <option value="3">红旗连锁门店员工排班表</option>
                </select>
                {/* <select name="" id="select3" className='storeType3' onChange={(event)=>{
                    this.setState({...this.state,jobJudgment:event.target.value})
                    store.getState().jobJudgment=event.target.value;
                    store.dispatch({type:'',data:store.getState()});
                }}>
                    <option value="收银员">收银员</option>
                    <option value="库房员" >库房员</option>
                    <option value="副经理">副经理</option>
                    <option value="导购员">导购员</option>
                    <option value="门店经理">门店经理</option>
                    <option value="门店经理">门店经理</option>
                </select> */}
                <select name="" id="select2" className='storeType2' onChange={(event)=>{
                    this.setState({...this.state,j:Number(event.target.value)})
                    store.getState().j=Number(event.target.value);
                    store.dispatch({type:'',data:store.getState()});
                }}>
                    <option value="0">请选择时间</option>
                    <option value="1">4月1日--4月7日</option>
                    <option value="2">4月8日--4月14日</option>
                    <option value="3">4月15日--4月21日</option>
                    <option value="4">4月22日--4月28日</option>
                </select>
               <table  className='table-shop' onClick={()=>{if(this.state.i===0||this.state.j===0){alert("请先选择门店和时间!")}}}> 
                <thead>
                    <tr>
                        {
                            this.state.j===0?<td>...</td>:<td><div className='week'>周一</div><div className='date'>{this.date[7*(this.state.j-1)+1]}</div></td>
                        } 
                        {
                            this.state.j===0?<td>...</td>:<td><div className='week'>周二</div><div className='date'>{this.date[7*(this.state.j-1)+2]}</div></td>
                        } 
                        {
                            this.state.j===0?<td>...</td>:<td><div className='week'>周三</div><div className='date'>{this.date[7*(this.state.j-1)+3]}</div></td>
                        } 
                        {
                            this.state.j===0?<td>...</td>:<td><div className='week'>周四</div><div className='date'>{this.date[7*(this.state.j-1)+4]}</div></td>
                        } 
                        {
                            this.state.j===0?<td>...</td>:<td><div className='week'>周五</div><div className='date'>{this.date[7*(this.state.j-1)+5]}</div></td>
                        } 
                        {
                            this.state.j===0?<td>...</td>:<td><div className='week'>周六</div><div className='date'>{this.date[7*(this.state.j-1)+6]}</div></td>
                        } 
                        {
                            this.state.j===0?<td>...</td>:<td><div className='week'>周日</div><div className='date'>{this.date[7*(this.state.j-1)+7]}</div></td>
                        } 
                    </tr>
                </thead>
                {this.state.i===0||this.state.j===0?
                    <tbody >
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                    </tbody>: 
                    <tbody>
                    <tr>
                        <td onClick={this.handleClick(0,0)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][0].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][0].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][0].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(1,0)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][0].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][0].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][0].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(2,0)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][0].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][0].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][0].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(3,0)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][0].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][0].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][0].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(4,0)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][0].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][0].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][0].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(5,0)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][0].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][0].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][0].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(6,0)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][0].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][0].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][0].job}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td onClick={this.handleClick(0,1)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][1].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][1].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][1].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(1,1)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][1].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][1].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][1].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(2,1)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][1].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][1].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][1].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(3,1)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][1].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][1].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][1].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(4,1)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][1].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][1].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][1].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(5,1)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][1].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][1].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][1].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(6,1)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][1].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][1].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][1].job}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td onClick={this.handleClick(0,2)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][2].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][2].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][2].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(1,2)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][2].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][2].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][2].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(2,2)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][2].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][2].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][2].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(3,2)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][2].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][2].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][2].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(4,2)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][2].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][2].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][2].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(5,2)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][2].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][2].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][2].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(6,2)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][2].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][2].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][2].job}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td onClick={this.handleClick(0,3)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][3].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][3].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][3].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(1,3)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][3].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][3].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][3].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(2,3)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][3].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][3].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][3].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(3,3)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][3].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][3].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][3].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(4,3)}>
                            <div className='left'><img src={people1}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][3].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][3].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][3].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(5,3)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][3].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][3].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][3].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(6,3)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][3].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][3].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][3].job}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td onClick={this.handleClick(0,4)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][4].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][4].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][4].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(1,4)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][4].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][4].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][4].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(2,4)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][4].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][4].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][4].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(3,4)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][4].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][4].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][4].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(4,4)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][4].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][4].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][4].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(5,4)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][4].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][4].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][4].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(6,4)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][4].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][4].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][4].job}</div>
                            </div>
                        </td>
                    </tr>
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][0][5]?
                        <tr>
                        <td onClick={this.handleClick(0,5)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][5].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][5].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][5].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(1,5)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][5].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][5].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][5].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(2,5)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][5].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][5].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][5].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(3,5)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][5].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][5].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][5].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(4,5)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][5].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][5].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][5].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(5,5)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][5].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][5].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][5].job}</div>
                            </div>
                        </td>
                        <td onClick={this.handleClick(6,5)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][5].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][5].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][5].job}</div>
                            </div>
                        </td>
                    </tr>:
                    <tr>
                        <td onClick={this.handleClick(0,5)}>...</td>
                        <td onClick={this.handleClick(1,5)}>...</td>
                        <td onClick={this.handleClick(2,5)}>...</td>
                        <td onClick={this.handleClick(3,5)}>...</td>
                        <td onClick={this.handleClick(4,5)}>...</td>
                        <td onClick={this.handleClick(5,5)}>...</td>
                        <td onClick={this.handleClick(6,5)}>...</td>
                    </tr>
                        }
                        
                    <tr>
                            {this.state.data[4*(this.state.i-1)+this.state.j-1][0][6]?
                            <td onClick={this.handleClick(0,6)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][6].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][6].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][6].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(0,6)}>...</td>
                            }
                        
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][1][6]?
                            <td onClick={this.handleClick(1,6)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][6].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][6].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][6].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(1,6)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][2][6]?
                            <td onClick={this.handleClick(2,6)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][6].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][6].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][6].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(2,6)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][3][6]?
                            <td onClick={this.handleClick(3,6)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][6].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][6].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][6].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(3,6)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][4][6]?
                            <td onClick={this.handleClick(4,6)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][6].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][6].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][6].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(4,6)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][5][6]?
                            <td onClick={this.handleClick(5,6)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][6].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][6].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][6].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(5,6)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][6][6]?
                            <td onClick={this.handleClick(6,6)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][6].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][6].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][6].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(6,6)}>...</td>
                            }
                    </tr>
                    <tr>
                            {this.state.data[4*(this.state.i-1)+this.state.j-1][0][7]?
                            <td onClick={this.handleClick(0,7)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][7].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][7].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][7].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(0,7)}>...</td>
                            }
                        
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][1][7]?
                            <td onClick={this.handleClick(1,7)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][7].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][7].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][7].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(1,7)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][2][7]?
                            <td onClick={this.handleClick(2,7)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][7].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][7].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][7].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(2,7)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][3][7]?
                            <td onClick={this.handleClick(3,7)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][7].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][7].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][7].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(3,7)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][4][7]?
                            <td onClick={this.handleClick(4,7)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][7].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][7].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][7].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(4,7)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][5][7]?
                            <td onClick={this.handleClick(5,7)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][7].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][7].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][7].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(5,7)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][6][7]?
                            <td onClick={this.handleClick(6,7)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][7].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][7].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][7].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(6,7)}>...</td>
                            }
                    </tr>
                    <tr>
                            {this.state.data[4*(this.state.i-1)+this.state.j-1][0][8]?
                            <td  onClick={this.handleClick(0,8)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][8].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][8].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][8].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(0,8)}>...</td>
                            }
                        
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][1][8]?
                            <td onClick={this.handleClick(1,8)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][8].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][8].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][8].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(1,8)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][2][8]?
                            <td onClick={this.handleClick(2,8)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][8].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][8].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][8].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(2,8)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][3][8]?
                            <td onClick={this.handleClick(3,8)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][8].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][8].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][8].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(3,8)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][4][8]?
                            <td onClick={this.handleClick(4,8)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][8].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][8].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][8].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(4,8)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][5][8]?
                            <td onClick={this.handleClick(5,8)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][8].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][8].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][8].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(5,8)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][6][8]?
                            <td onClick={this.handleClick(6,8)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][8].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][8].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][8].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(6,8)}>...</td>
                            }
                    </tr>
                
                        <tr>
                            {this.state.data[4*(this.state.i-1)+this.state.j-1][0][9]?
                            <td onClick={this.handleClick(0,9)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][9].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][9].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][0][9].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(0,9)}>...</td>
                            }
                        
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][1][9]?
                            <td onClick={this.handleClick(1,9)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][9].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][9].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][1][9].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(1,9)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][2][9]?
                            <td onClick={this.handleClick(2,9)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][9].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][9].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][2][9].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(2,9)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][3][9]?
                            <td onClick={this.handleClick(3,9)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][9].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][9].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][3][9].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(3,9)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][4][9]?
                            <td onClick={this.handleClick(4,9)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][9].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][9].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][4][9].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(4,9)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][5][9]?
                            <td onClick={this.handleClick(5,9)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][9].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][9].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][5][9].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(5,9)}>...</td>
                            }
                        {this.state.data[4*(this.state.i-1)+this.state.j-1][6][9]?
                            <td onClick={this.handleClick(6,9)}>
                            <div className='left'><img src={people}/></div>
                            <div className='right'>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][9].time}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][9].employeeName}</div>
                                <div>{this.state.data[4*(this.state.i-1)+this.state.j-1][6][9].job}</div>
                            </div>
                            </td>:
                            <td onClick={this.handleClick(6,9)}>...</td>
                            }
                    </tr>
                </tbody>  
                }                 
               </table>
            </div>
        )
    }
}