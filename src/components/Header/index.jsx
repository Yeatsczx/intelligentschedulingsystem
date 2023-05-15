import React, { Component, useState } from 'react'
import { Modal, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import './index.less'
import LinkButton from '../link-button'

export default function Header() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        currentTime: formateDate(Date.now()), // 当前时间字符串
        dayPictureUrl: '', // 天气图片url
    });
    function getTime() {
        // 每隔1s获取当前时间, 并更新状态数据currentTime
        setInterval(function () {
            const currentTime = formateDate(Date.now())
            setState({ currentTime })
        }, 1000)

    }
    function logout() {
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确定退出吗',
            onOk() {
                navigate('/');
            }
        });
    }
    /*
    第一次render()之后执行一次
    一般在此执行异步操作: 发ajax请求/启动定时器
    */
    // 获取当前的时间
    getTime()
    const { currentTime, dayPictureUrl, weather } = state;
    const username = memoryUtils.user.username;
    return (
        <div className="header">
            <div className="header-top">
                <span>欢迎 {username}</span>
                <LinkButton onClick={logout}>退出</LinkButton>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">主页</div>
                <div className="header-bottom-right">
                    <span>{currentTime}</span>
                    {/* <img src={dayPictureUrl} alt="weather" />
                    <span>{weather}</span> */}
                </div>
            </div>
        </div>
    )
}
