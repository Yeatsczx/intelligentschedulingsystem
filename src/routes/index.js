import Admin from '../pages/Admin/Admin';
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Category from '../pages/Category/Category'
import Bar from '../pages/Charts/Bar'
import Line from '../pages/Charts/Line'
import Pie from '../pages/Charts/Pie'
import Role from '../pages/Role/Role'
import User from '../pages/User/User'
import ProductHome from '../pages/Product/Home'
import ProductDetail from '../pages/Product/detail'
import ProductAddUpdate from '../pages/Product/add-update'
import { Navigate } from 'react-router-dom';

export default [
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [
            {
                path: 'category',
                element: <Category />
            },
            {
                path: 'bar',
                element: <Bar />
            }, {
                path: 'line',
                element: <Line />
            }, {
                path: 'pie',
                element: <Pie />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: '',
                element: <Navigate to="/admin/home" />
            },
            {
                path: 'product-home',
                element: <ProductHome />
            },
            {
                path: 'product-detail',
                element: <ProductDetail />
            },
            {
                path: 'product-add-update',
                element: <ProductAddUpdate />
            },
            {
                path: 'role',
                element: <Role />
            },
            {
                path: 'user',
                element: <User />
            }
        ]
    }
]