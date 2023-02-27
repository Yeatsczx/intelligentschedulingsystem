import React, { Component, useState } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
} from 'antd'
import {
    PlusOutlined
} from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { Route, Routes, Navigate, useNavigate, Link, } from 'react-router-dom'


export default function Product() {
    const navigate = useNavigate();
    const [product] = useState(
        [
            {
                "status": 1,
                "_id": "5ca9e05db49ef916541160cd",
                "name": "联想ThinkPad",
                "desc": "年度重量级新品，全新登场",
                "price": "6600",
                "_v": 0
            },

            {
                "status": 1,
                "_id": "5ca9e05db49ef916541160ce",
                "name": "华硕飞行堡垒",
                "desc": "15.6英寸窄边框游戏笔记本电脑",
                "price": "6799",
                "_v": 0
            },
            {
                "status": 1,
                "imgs": [
                    "image-1559402396338.jpg"
                ],
                "_id": "5e145c5ed9ba8f39dc5f87a1",
                "name": "联想ThinkPad 翼4809",
                "desc": "年度重量级新品,X390、T490全新登场 更加轻薄机身设计9",
                "price": 65999,
                "pCategoryId": "5e12b8bce31bb727e4b0e348",
                "categoryId": "5fc74b650dd9b10798413162",
                "__v": 0
            },
            {
                "status": 1,
                "imgs": [
                    "image-1559402396338.jpg"
                ],
                "_id": "5e146b3cd9ba8f39dc5f87a2",
                "name": "联想ThinkPad 翼4809",
                "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
                "price": 65999,
                "pCategoryId": "5e12b8bce31bb727e4b0e348",
                "categoryId": "5fc74b650dd9b10798413162",
                "detail": "",
                "__v": 0
            },
            {
                "status": 2,
                "imgs": [
                    "image-1559402396338.jpg"
                ],
                "_id": "5e146b40d9ba8f39dc5f87a3",
                "name": "联想ThinkPad 翼4809",
                "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
                "price": 65999,
                "pCategoryId": "5e12b8bce31bb727e4b0e348",
                "categoryId": "5fc74b650dd9b10798413162",
                "detail": "",
                "__v": 0
            }
        ],
    )
    // 初始化table的列的数组
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
        },
        {
            width: 100,
            title: '状态',
            dataIndex: 'status',
            render: (product) => {
                return (
                    <span>
                        <Button
                            type='primary'
                        >
                            下架
                        </Button>
                        <span>在售</span>
                    </span>
                )
            }
        },
        {
            width: 100,
            title: '操作',
            render: (product) => {
                return (
                    <span>
                        {/*将product对象使用state传递给目标路由组件*/}
                        <LinkButton ><Link to='/admin/product-detail'>详情</Link></LinkButton>
                        <LinkButton >修改</LinkButton>
                    </span>
                )
            }
        },
    ];
    const title = (
        <span>
            <Select style={{ width: 120 }}>
                <Select.Option value='productName'>按名称搜索</Select.Option>
                <Select.Option value='productDesc'>按描述搜索</Select.Option>
            </Select>
            <Input
                placeholder='关键字'
                style={{ width: 150, margin: '0 15px' }}
            />
            <Button type='primary' >搜索</Button>
        </span>
    )

    const extra = (
        <Button type='primary' onClick={() => { navigate('/admin/product-add-update') }}>
            <PlusOutlined />
            添加商品
        </Button>
    )
    return (
        <div>
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={product}
                    columns={columns}
                />
            </Card>
        </div>
    )
}
