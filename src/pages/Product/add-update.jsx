import React, { Component } from 'react'
import {
    Card,
    Icon,
    Form,
    Input,
    Cascader,
    Button,
    InputNumber,
    message,
    Select,

} from 'antd'
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { Route, Routes, Navigate, useNavigate, Link, } from 'react-router-dom'
export default function AddUpdate() {
    const navigate = useNavigate();
    const { Option } = Select;

    const title = (
        <span>
            <LinkButton onClick={() => { navigate('/admin/product-home') }}>
                <ArrowLeftOutlined style={{ marginRight: 10, fontSize: 20 }} />
            </LinkButton>

            <span>添加商品</span>
        </span>
    )
    const layout = {
        labelCol: { span: 2 },  // 左侧label的宽度
        wrapperCol: { span: 8 }, // 右侧包裹的宽度
    };
    /* eslint-disable no-template-curly-in-string */

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    return (
        <Card title={title}>
            <Form {...layout} name="nest-messages" validateMessages={validateMessages} >
                <Form.Item
                    name={['user', 'name']}
                    label="商品名称"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="商品描述" rules={[
                    {
                        required: true,
                    },
                ]}>
                    <Input.TextArea placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>
                <Form.Item name={['user', 'website']} label="商品价格" rules={[
                    {
                        required: true,
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'distinguish']} label="商品分类" rules={[
                    {
                        required: true,
                    },
                ]}>
                    <Select
                        placeholder="请指定商品分类"
                        allowClear
                    >
                        <Option value="male">家用电器</Option>
                        <Option value="female">笔记本电脑</Option>
                        <Option value="other">显示器</Option>
                        <Option value="1">蓝牙耳机</Option>
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" style={{ marginLeft: 100 }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )

}
