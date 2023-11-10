import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../../redux/loadersSlice';
import { GetAllBids } from '../../../apicalls/products';
import { Divider, Modal, Table, message } from 'antd';
import moment from 'moment';
import { styled ,css} from 'styled-components';

function Bids({
    showBidsModal,
    setShowBidsModal,
    selectedProduct
}) {
    const [bidsData,setBidsData] = useState([])
    const dispatch = useDispatch();
    const getData = async()=>{
        try {
            dispatch(setLoader(true))
            const response = await GetAllBids({
                product:selectedProduct._id
            })
                dispatch(setLoader(false));
                if(response.success){
                    setBidsData(response.data)
                }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message)           
        }
    }
    const columns = [
        {
            title:"Bid Placed On",
            dataIndex:"createdAt",  
            render:(text,record)=>{
                return moment(text).format("DD-MM-YYYY hh:mm a")
            }
        },
        {
            title:"Name",
            dataIndex:"name",
            render:(text,record)=>{
                return record.buyer.name
            }
        },
        {
            title:"Bid Amount",
            dataIndex:"bidAmount"
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
                );
            }
        },
    ];
    useEffect(()=>{
        if(selectedProduct){
            getData()
            console.log()
        }
    },[selectedProduct])
    
    const BidOverlay = styled.div`
     display:flex;
     flex-direction:column;
     gap:5px;
    ` 
    const BidsTitle = styled.h3`
        font-size:20px;
        color:${props=>(props.prim?'#404040' : '#003319')}
    `
  return (
    <Modal
        open={showBidsModal}
        onCancel={()=>setShowBidsModal(false)}
        centered
        width={1200}
        footer={null}
    >
        <BidOverlay>
            <BidsTitle>Bids</BidsTitle>
            <Divider/>
            <BidsTitle $prim={true}>
                Product Name:{selectedProduct.name}
            </BidsTitle>
            <Table columns={columns} dataSource={bidsData}/>
        </BidOverlay>
    </Modal>
  )
}

export default Bids
