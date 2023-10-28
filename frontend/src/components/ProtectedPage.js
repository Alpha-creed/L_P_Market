import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
import styled from 'styled-components'
import { Logout } from '../Assests/icons'
import { setLoader } from '../redux/loadersSlice'

function ProtectedPage({children}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.users);
    const Header = styled.div`
        display:flex;
        justify-content:space-between;
        align-items:center;
        background:#405138;
        padding:25px;
    `
    const Users=styled.div`
        background:white;
        padding:20px 40px;
        border-radius:20px;
        align-items:center;
        display:flex;
    `
    const UserName =styled.span`
        text-decoration:underline;
        cursor:pointer;
        padding:2px;
        text-transform:uppercase;
    `

    const H1 = styled.h1`
        font-size:25px;
        color:white;
        cursor:pointer;
    `
    const Noti = styled.span`
        margin-right:15px;
        cursor:pointer;
    `

    const Layout = styled.div`
        padding:25px;
    `

    const validationToken = async()=>{
        try {
            
        } catch (error) {
            
        }
    } 
    useEffect(()=>{
        if(localStorage.getItem("token")){
            validationToken();

        }else{
            navigate("/login")
        }
    },[])

  return (
    user && (
        <div>
      {/* header */}
      <Header>
        <H1 onClick={()=>navigate("/")}>
            LAP&PHON
        </H1>
        <Users>
            <UserName
                onClick={()=>{
                    if(user.role === "user"){
                        navigate("/profile");
                    }else{
                        navigate("/admin")
                    }
                }}
            >{user.name}</UserName>
            {/* notification-bar */}
            <Noti>

            </Noti>
            {/* <Logout onClick={()=>{
                localStorage.removeItem("token");
                navigate("/login")
            }}></Logout> */}
            <i className="ri-logout-circle-r-line"
                onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
            ></i>
        </Users>
      </Header>
      {/* body */}
            <Layout>{children}</Layout>
    </div>
    )
  )
}

export default ProtectedPage
