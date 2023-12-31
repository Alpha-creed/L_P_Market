import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Logout } from '../Assests/icons'
import { setLoader } from '../redux/loadersSlice'
import { GetCurrentUser } from '../apicalls/users'
import { setUser } from '../redux/userSlice'
import { Avatar, Badge, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { GetAllNotice, ReadAllNotice } from '../apicalls/notice'
import Notice from './notice'

function ProtectedPage({ children }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.users);
    const [notice = [],setNotice] = useState([])
    const [showNotice,setShowNotice] = useState(false)
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
    const Lay = styled.div`
        padding:25px;
    `
    const validationToken = async()=>{
        try {
            dispatch(setLoader(true))
            const response = await GetCurrentUser();
            dispatch(setLoader(false))
            if(response.success){
               dispatch(setUser(response.data));
            }else{
                navigate("/login")
                message.error(response.message);
            }
        } catch (error) {
            dispatch(setLoader(false));
            navigate("/login")
            message.error(error.message)
        }
    } 

    const getNotice = async()=>{
        try {
            const response = await GetAllNotice();
            if(response.success){
                setNotice(response.data);
            }else{
                throw new Error(response.message)
               
            }
        } catch (error) {
            message.error(error.message)
            console.log(error)
        }
    }

    const readNotice = async()=>{
        try {
            const response = await ReadAllNotice();
            if(response.success){
                getNotice();
            }else{
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message);
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            validationToken();
            getNotice();
        }else{
            navigate('/login');

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
                <Badge count = {notice?.filter((noti)=>!noti.read).length}
                    onClick={()=>{
                        readNotice();
                        setShowNotice(true);
                    }}
                >
                    <Avatar
                        size="medium"
                        icon={<i className="ri-shield-flash-line"></i>}
                    />
                </Badge>
            </Noti>
             <i className="ri-logout-circle-r-line"
                onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
            ></i>
        </Users> 
      </Header>
      {/* body */}
            <div>{children}</div>
    {/* notification-body */}
    {
        <Notice
            notification={notice}
            reloadNotification={getNotice}
            showNotification={showNotice}
            setShowNotification={setShowNotice}
        />
    }
    </div>
    )
  )
}

export default ProtectedPage
