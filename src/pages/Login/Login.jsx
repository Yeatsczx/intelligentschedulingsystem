import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Form,
  Input,
  Button,
  message
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.less'
import logo from '../../assets/images/R-C.png'
import { reqLogin } from '../../api';


const Item = Form.Item // 不能写在import之前


/*
登陆的路由组件
 */
export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login">
      <header className="login-header">
        {/* <img src={logo} alt="logo" /> */}
        <h1>智能排班系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登陆</h2>
        <Form onFinish={
          // async (values) => {
          //   // 检验成功
          //   // console.log('提交登陆的ajax请求', values)
          //   // 请求登陆
          //   const { username, password } = values
          //   console.log(values);
          //   const result = await reqLogin(username, password) // {status: 0, data: user}  {status: 1, msg: 'xxx'}
          //   // console.log('请求成功', result)
          //   if (result.status === 0) { // 登陆成功
          //     // 提示登陆成功
          //     message.success('登陆成功')

          //     // 保存user
          //     const user = result.data

          //     // 跳转到管理界面 (不需要再回退回到登陆)
          //     navigate('/admin');

          //   } else { // 登陆失败
          //     // 提示错误信息
          //     message.error(result.msg)
          //   }

          // }
          async (values)=>{



var config = {
   method: 'post',
   url: 'http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?weekid=<9>',
   headers: { 
      'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
   }
};

axios(config)
.then(function (response) {
   console.log(JSON.stringify(response.data));
})
.catch(function (error) {
   console.log(error);
});
            const { username, password } = values;
            if(username==='admin'&&password==="admin"){
              message.success('登陆成功');
              navigate('/admin');
            }
            else{
              message.error('账号或密码错误');
            }
          }
        } className="login-form" >
          <Item
            name="username" /* name必须写 */
            rules={[
              { required: true, whitespace: true, message: '用户名必须输入' },
              { min: 4, message: '用户名至少4位' },
              { max: 12, message: '用户名最多12位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
            ]}>
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
          </Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, whitespace: true, message: '密码必须输入' },
              { min: 4, message: '密码至少4位' },
              { max: 12, message: '密码最多12位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' },
            ]}>
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div >
  )
}
/* 
async和await
1. 作用 ?
  简化promise对象的使用 : 不用再使用then()来指定成功 / 失败的回调函数
以同步编码(没有回调函数了)方式实现异步流程
2. 哪里写await ?
  在返回promise的表达式左侧写await : 不想要promise, 想要promise异步执行的成功的value数据
3. 哪里写async ?
  await所在函数(最近的)定义的左侧写async
    */ 