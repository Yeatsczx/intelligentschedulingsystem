import React, { Component } from 'react'
import {
    Card,
    Icon,
    List
} from 'antd'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import './product.less'
import { Route, Routes, Navigate, useNavigate, Link, } from 'react-router-dom'
import LinkButton from '../../components/link-button'

const Item = List.Item
export default function Detail() {
    const navigate = useNavigate();
    const title = (
        <span>
            <LinkButton onClick={() => { navigate('/admin/product-home') }}>
                <ArrowLeftOutlined style={{ marginRight: 10, fontSize: 20 }} />
            </LinkButton>

            <span>商品详情</span>
        </span>
    )
    return (
        <div><Card title={title} className='product-detail'>
            <List>
                <Item>
                    <span className="left">商品名称:</span>
                    联想ThinkPad
                </Item>
                <Item>
                    <span className="left">商品描述:</span>
                    年度重量级新品，全新登场
                </Item>
                <Item>
                    <span className="left">商品价格:</span>
                    6600元
                </Item>
                <Item>
                    <span className="left">所属分类:</span>
                    电脑--{'>'}笔记本
                </Item>
                <Item>
                    <span className="left">商品图片:</span>
                    <span>
                        <img
                            src="https://img14.360buyimg.com/n1/s450x450_jfs/t1/167394/11/25839/148204/61db9d1dEee3341c8/ce68ebee7e23b1c1.jpg"
                            className="product-img"
                            alt="img"
                        />
                    </span>
                </Item>

            </List>
        </Card></div>
    )

}
