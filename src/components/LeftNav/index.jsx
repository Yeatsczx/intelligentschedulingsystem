import React, { Component } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import './index.less'
// import logo from '../../assets/images/R-C.png'
// import { Item } from 'rc-menu';

const { SubMenu } = Menu;
export default function LeftNav() {
    const path = useLocation().pathname
    return (
        <div className='left-nav'>
            <Link to='/' className='left-nav-header'>
                <h1>智能排班系统</h1>
            </Link>

            <Menu
                style={{ height: 750 }}
                mode="inline"
                theme="dark"
                selectedKeys={[path]}
            >
                <Menu.Item key="/admin/home" icon={<AppstoreOutlined />}>
                    <Link to='/admin/home'>首页</Link>
                </Menu.Item>
                {/* <SubMenu key="sub1" icon={<MenuUnfoldOutlined />} title="商品">
                    <Menu.Item key="/admin/category" icon={<PieChartOutlined />}><Link to='/admin/category'>品类管理</Link></Menu.Item>
                    <Menu.Item key="/admin/product-home" icon={<PieChartOutlined />}><Link to='/admin/product-home'>商品管理</Link></Menu.Item>
                </SubMenu> */}
                <Menu.Item key="/admin/user" icon={<DesktopOutlined />}><Link to='/admin/user'>用户管理</Link></Menu.Item>
                <Menu.Item key="/admin/role" icon={<ContainerOutlined />}><Link to='/admin/role'>角色管理</Link></Menu.Item>
                {/* <SubMenu key="sub2" icon={<MenuFoldOutlined />} title="图形图表">
                    <Menu.Item key="/admin/bar" icon={<MailOutlined />}><Link to='/admin/bar'>柱形图</Link></Menu.Item>
                    <Menu.Item key="/admin/line" icon={<MailOutlined />}><Link to='/admin/line'>折线图</Link></Menu.Item>
                    <Menu.Item key="/admin/pie" icon={<MailOutlined />}><Link to='/admin/pie'>饼图</Link></Menu.Item>
                </SubMenu> */}
            </Menu>
        </div>
    )
}

