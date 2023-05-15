import React from 'react'
import * as ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import store from'./pages/redux/store'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BrowserRouter><App /></BrowserRouter>);
store.subscribe(()=>{
  root.render(<BrowserRouter><App /></BrowserRouter>);
})