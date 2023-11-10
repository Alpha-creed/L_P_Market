import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../redux/loadersSlice'
import { GetAllBids } from '../../../apicalls/products'
import { Table, message } from 'antd'
import moment from 'moment'
import { styled } from 'styled-components'

function UserBids() {
  const [bidsData,setBidsData] = useState([])
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.users)
  const getData = async()=>{
    try {
      dispatch(setLoader(true))
      const response = await GetAllBids({
        buyer:user._id,
      });
      dispatch(setLoader(false))
      if(response.success){
        setBidsData(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false))
      message.error(error.message)
    }
  }

  const columns = [
    {
      title:"Product",
      dataIndex:"product",
      render:(text,record)=>{
        return record.product.name
      }
    },
    {
      title:"Bid Placed On",
      dataIndex:"createdAt",
      render:(text,record)=>{
        return moment(text).format("DD-MM-YYYY hh:mm a")
      }
    },{
      title:"Bid Amount",
      dataIndex:"bidAmount",
    },
    {
      title:"Offered Price",
      dataIndex:"offered Price",
      render:(text,record)=>{
        return record.product.price;
      }
    },
    {
      title:"Message",
      dataIndex:"message",
    },
    {
      title:"Contact Details",
      dataIndex:"contactDetails",
      render:(text,record)=>{
        return(
          <div>
            <p>Phone:{record.mobile}</p>
            <p>Email:{record.buyer.email}</p>
          </div>
        )
      }
    }
  ];
  useEffect(()=>{
    getData()
  },[])
  const Overlay = styled.div`
    display:flex;
    flex-direction:column;
    gap:5;
  `
  return (
    <Overlay>
      <Table columns={columns} dataSource={bidsData}/>
    </Overlay>
  )
}

export default UserBids
