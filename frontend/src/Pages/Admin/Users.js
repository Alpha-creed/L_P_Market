import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../redux/loadersSlice';
import { GetAllUsers } from '../../apicalls/users';
import { Table, message } from 'antd';
import { UpdateProductStatus } from '../../apicalls/products';
import moment from 'moment';
import { styled } from 'styled-components';

function Users() {
    const [users,setUsers] = useState([])
    const dispatch = useDispatch();
    
    const getData = async()=>{
        try{
            dispatch(setLoader(true))
            const response = await GetAllUsers(null);
            dispatch(setLoader(false));
            if(response.success){
                setUsers(response.data);
            }
        }catch(error){
            dispatch(setLoader(false))
            message.error(error.message);
        }
    }

    const onStatusUpdate = async(id,status)=>{
        try {
            dispatch(setLoader(true))
            const response = await UpdateProductStatus(id,status);
            dispatch(setLoader(false))
            if(response.success){
                message.success(response.message);
                getData();
            }else{
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message);
        }
    }

    const columns = [
        {
            title:"Name",
            dataIndex:"name",
        },
        {
            title:"Email",
            dataIndex:"email",
        },
        {
            title:"Role",
            dataIndex:"role",
            render:(text,record)=>{
                return record.role.toUpperCase();
            }
        },
        {
            title:"Created At",
            dataIndex:"createdAt",
            render:(text,record)=>
                moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
            
        },
        {
            title:"Status",
            dataIndex:"status",
            render:(text,record)=>{
                return record.status.toUpperCase()
            }
        },
        {
            title:"Action",
            dataIndex:"action",
            render:(text,record)=>{
                const {status,_id} = record;
                return(
                    <ActOverlay>
                        {status === "active" &&(
                            <ActSpan
                                onClick={()=>onStatusUpdate(_id,"blocked")}
                            >
                                Block
                            </ActSpan>
                        )}
                        {
                            status ==="blocked" &&(
                                <ActSpan
                                    onClick={()=>onStatusUpdate(_id,"active")}
                                >unblock</ActSpan>
                            )
                        }
                    </ActOverlay>
                )
            }
        }
    ]
    const ActSpan = styled.span`
        text-decoration:underline;
        cursor:pointer;
    `
    const ActOverlay = styled.div`
        display:flex;
        gap:6;
    `
    useEffect(()=>{
        getData();
    },[])
  return (
    <div>
      <Table columns={columns} dataSource={users}/>
    </div>
  )
}

export default Users
