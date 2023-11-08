import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { GetProducts, UpdateProductStatus } from '../../apicalls/products';
import { Table, message } from 'antd';
import { styled } from 'styled-components';
import moment from 'moment';

function Product() {
    const [product,setProducts] = useState([]);
    const dispatch = useDispatch();
    
    const getData = async()=>{
        try {
            dispatch(setLoader(true))
            const response = await GetProducts(null);
            dispatch(setLoader(false));
            if(response.success){
                setProducts(response.data);
            }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message);
        }
    }
    const onStatusUpdate = async(id,status)=>{
        try {
            dispatch(setLoader(true));
            const response = await UpdateProductStatus(id,status);
            dispatch(setLoader(false));
            if(response.success){
                message.success(response.message)
                getData()
            }else{
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message)
        }
    }
    const columns = [
        {
            title:"Product",
            dataIndex:"image",
            render:(text,record)=>{
                return(
                    <Imgs src={record?.images?.length>0?record.images[0]:""}
                    alt='pic'
                    />
                )
            }
        },
        {
            title:"Product",
            dataIndex:"name",
        },
        {
            title:"Seller",
            dataIndex:"name",
            render:(text,record)=>record.seller.name,
        },
        {
            title:"Price",
            dataIndex:"price",
        },
        {
            title:"Category",
            dataIndex:"category",
        },
        {
            title:"Age",
            dataIndex:"age",
        },
        {
            title:"Status",
            dataIndex:"status",
            render:(text,record)=>{
                return record.status.toUpperCase();
            }
        },
        {
            title:"Added On",
            dataIndex:"createdAt",
            render:(text,record)=>
            moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
        },
        {
            title:"Action",
            dataIndex:"action",
            render:(text,record)=>{
                const {status,_id} = record;
                return(
                    <ActOverlay>
                        {status === "pending" && (
                            <ImgsSpan onClick={()=>onStatusUpdate(_id,"approved")}>Approve</ImgsSpan>
                        )}
                        {
                            status === "pending" && (
                                <ImgsSpan onClick={()=>onStatusUpdate(_id,"rejected")}>Reject</ImgsSpan>
                            )
                        }
                        {
                            status === "approved" && (
                                <ImgsSpan onClick={()=>onStatusUpdate(_id,"blocked")}>Block</ImgsSpan>
                            )
                        }
                        {
                            status === "blocked" && (
                                <ImgsSpan onClick={()=>onStatusUpdate(_id,"approved")}>unblock</ImgsSpan>
                            )
                        }
                    </ActOverlay>
                )
            }
        }
    ]
    useEffect(()=>{
        getData()
    },[])
    const ImgsSpan = styled.span`
        text-decoration:underline;
        cursor:pointer;
        margin:0 5px;
    `
    const Imgs = styled.img`
        width:100px;
        height:100px;
        object-fit:cover;
        border:1px solid;
        border-radius:15px;
    ` 
    const ActOverlay = styled.div`
        display:flex;
        gap:6;
    `
  return (
    <div>
      <Table columns={columns} dataSource={product}/>
    </div>
  )
}

export default Product
