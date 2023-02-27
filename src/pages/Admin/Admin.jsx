import React from 'react'
import { Layout } from 'antd';
import { Route, Routes, Navigate, useNavigate, Outlet } from 'react-router-dom'
import LeftNav from '../../components/LeftNav';
import Header from '../../components/Header';

const { Footer, Sider, Content } = Layout;
export default function Admin() {
  const Navigate = useNavigate();
  return (<Layout style={{ width: '100%' }}>
    <Sider ><LeftNav /></Sider>
    <Layout>
      <Header>Header</Header>
      <Content style={{ margin: 20, backgroundColor: '#fff', height: 750 }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
    </Layout>
  </Layout>
  )
}
