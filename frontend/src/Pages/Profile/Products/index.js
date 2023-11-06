import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../redux/loadersSlice';
import { DeleteProduct, GetProducts } from '../../../apicalls/products';
import { Button, Table, message } from 'antd';
import { styled } from 'styled-components';
import moment from "moment"
import ProductsForm from './ProductsForm';

function Product() {
    const [selectedProduct,setSelectedProduct] = useState(null);
    const [products,setProducts] = useState([]);
    const [showProductForm,setShowProductForm] = useState(false);
    const {user} = useSelector((state)=>state.users);
    const dispatch = useDispatch();
    const deleteProduct = async(id)=>{
        try {
            dispatch(setLoader(true))
            const response = await DeleteProduct(id)
            dispatch(setLoader(false))
            if(response.success){
                message.success(response.message);
                getData();
            }else{
                message.error(response.message)
            }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message)
        }
    }
    const getData = async()=>{
        try {
            dispatch(setLoader(true));
            const response = await GetProducts({seller:user._id});
            dispatch(setLoader(false));
            if(response.success){
                setProducts(response.data);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    }
    const columns = [
        {
            title:"Product",
            dataIndex:"image",
            render:(text,record)=>{
                return(
                    <ColImg
                        src={record?.images?.length>0?record.images[0]:""}
                        alt="Pic"
                    />
                )
            }
        },
        {
            title:"Name",
            dataIndex:'name',
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
        },
        {
            title:"Added On",
            dataIndex:"createdAt",
            render:(text,record)=>
                moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
        },
        {
            title:"Action",
            dataIndex:"action",
            render:(text,record)=>{
                return (
                    <ActionOverlay>
                        <i className="ri-delete-back-fill"
                            onClick={()=>{
                                deleteProduct(record.id);
                            }}
                        ></i>
                        <i className="ri-edit-circle-line"
                            onClick={()=>{
                                setSelectedProduct(record);
                                setShowProductForm(true)
                            }}
                        ></i>
                        <ShowBid
                            onClick={()=>{
                        
                            }} 
                        >Show Bids</ShowBid>
                    </ActionOverlay>
                )
            }
        }
    ]
    useEffect(()=>{
        getData();
    },[])
    const ShowBid = styled.span`
        text-decoration:underline;
    `
    const ActionOverlay=styled.div`
    display:flex;
    gap:10px;
    cursor:pointer;
    align-items:center;
    `

    const ColImg = styled.img`
        width:100px;
        height:100px;
        object-fit:cover;
        border:1px solid;
        border-radius:15px;
    `

    const BtnOverlay = styled.div`
        display:flex;
        justify-content:end;
        margin-bottom:5px;
    `
  return (
    <div>
      <BtnOverlay>
        <Button
        type="default"
        onClick={()=>{
            setSelectedProduct(null);
            setShowProductForm(true);
        }}>Add Product</Button>
      </BtnOverlay>
      <Table columns={columns} dataSource={products}/>
      {
        showProductForm&&(
            <ProductsForm
                showProductForm={showProductForm}
                setShowProductForm={setShowProductForm}
                selectedProduct={selectedProduct}
                getData={getData}/>
        )
      }
    </div>
  )
}

export default Product
