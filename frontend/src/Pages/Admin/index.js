import { Tabs } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
import Users from './Users';
import Product from './Product';

function Admin() {
  const navigate = useNavigate();
  const {user} =useSelector(state=>state.users)
  useEffect(()=>{
    if(user.role != 'admin'){
      window.location.href="/"
    }
  })
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Products" key = "1">
          <Product/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key = "2">
          <Users/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Admin
