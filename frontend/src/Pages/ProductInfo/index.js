import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { setLoader } from '../../redux/loadersSlice';
import { GetAllBids, GetProductById } from '../../apicalls/products';
import { message } from 'antd';
import { styled } from 'styled-components';

function ProductInfo() {
  const {user} = useSelector((state)=>state.users);
  const [selectedImageIndex,setSelectedImageIndex] = useState(0);
  const [showAddNewBid,setShowAddNewBid] = useState(false);
  const [product,setProduct] = useState(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {id} = useParams();
  const getData = async()=>{
    try {
      dispatch(setLoader(true))
      const response = await GetProductById(id);
      dispatch(setLoader(false));
      if(response.success){
        const bidsResponse = await GetAllBids({product:id});
        setProduct({
          ...response.data,
          bids:bidsResponse.data,
        })
      }
    } catch (error) {
      dispatch(setLoader(false))
      message.error(error.message)
    }
  }
  useEffect(()=>{
    getData()
  },[]);
  const ProductOverlay = styled.div`
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:20;
  `
  const Header = styled.h1`
    font-size:20px;
    font-style:bold;
    color:#660000;
    text-transform:uppercase;
  `
  return (
    product &&(
      <div>
      
    </div>
    )
    
  )
}

export default ProductInfo
