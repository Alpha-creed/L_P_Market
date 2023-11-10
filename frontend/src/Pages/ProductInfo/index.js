import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { setLoader } from '../../redux/loadersSlice';
import { GetAllBids, GetProductById } from '../../apicalls/products';
import { Button, Divider, message } from 'antd';
import { styled } from 'styled-components';
import moment from 'moment';
import BidModal from './BidModal';

function ProductInfo() {
  const {user} = useSelector((state)=>state.users);
  const [selectedImageIndex,setSelectedImageIndex] = useState(0);
  const [showAddNewBid,setShowAddNewBid] = useState(false);
  const [product,setProduct] = useState(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { id } = useParams();
  const getData = async()=>{
    try {
      dispatch(setLoader(true))
      const response = await GetProductById(id);
      dispatch(setLoader(false));
      if(response.success){
        console.log(id);
        const bidsResponse = await GetAllBids({product:id});
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        })
        // setProduct(
        // response.data
        // )
      }
    } catch (error) {
      dispatch(setLoader(false))
      message.error(error.message)
      console.log(error)
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
  const ProdOverlay = styled.div`
    margin:0 15px;
  `
  const ProdImg = styled.img`
    width:100%;
    height:350px;
    object-fit:cover;
    border-radius:5px;
  `
  const Header = styled.h1`
    font-size:20px;
    font-style:bold;
    color:#660000;
    text-transform:uppercase;
  `
  const SmallProdImgOverlay = styled.div`
    display:flex;
    gap:5px;
  `
  const SmallImagesStyles=styled.img`
    width:70px;
    height:70px;
    object-fit:cover;
    border-radius:15px;
    cursor:pointer;
    padding:5px;
    border:${props=>props.selectedImageIndex === props.index?"1px dashed #003333":""}
  `
  const H4 = styled.h4`
    color:"#404040
  `
  const DetOverlay = styled.div`
    display:flex;
    flex-direction:column;
    gap:10
  `
  const Details = styled.div`
    display:flex;
    flex-direction:column;
  `
  const SubHeader = styled.div`
    display:flex;
    justify-content:space-between;
    margin:10px 0;
  `
  const TextTrans = styled.span`
    text-transform:uppercase;
  `
  const BidOverlay = styled.div`
    border:1px solid #BDB9B9,
    padding:2;
    border-radius:5px;
    margin:10px 0
  `
  const BidHeader = styled.div`
  display:flex;
  justify-content:space-between;
  margin:10px 0;
  color:#7D7D7D;
  `
  return (
    product &&(
      <ProdOverlay>
        <ProductOverlay>
          {/* images */}
            <ProdImg
              src={product.images[selectedImageIndex]}
              alt=""
            />
          <SmallProdImgOverlay>
            {product.images.map((img,index)=>{
              return(
                  <SmallImagesStyles
                  selectedImageIndex={selectedImageIndex}
                  index={index}
                  onClick={()=>setSelectedImageIndex(index)}
                  src={img}
                  alt="Pic"
                  />
              )
            })}
          </SmallProdImgOverlay>
          <Divider/>
          <div>
              <H4>
                Added On
              </H4>
              <span>
                {moment(product.createdAt).format("MMM D,YYYY hh:mm A")}
              </span>
          </div>
        </ProductOverlay>
        {/* details */}
            <DetOverlay>
              <div>
                <Header>{product.name}</Header>
                <span>{product.description}</span>
              </div>
              <Divider/>
              <Details>
                <Header>Product details</Header>
                <SubHeader>
                  <span>Price</span>
                  <span>${product.price}</span>
                </SubHeader>
                <SubHeader>
                  <span>Category</span>
                  <TextTrans>{product.category}</TextTrans>
                </SubHeader>
                <SubHeader>
                  <span>Bill Available</span>
                  <span>{product.billAvialable ? "Yes":"No"}</span>
                </SubHeader>
                <SubHeader>
                  <span>Box Available</span>
                  <span>{product.boxAvailable ? "Yes":"No"}</span>
                </SubHeader>
                <SubHeader>
                  <span>Accessories Available</span>
                  <span>{product.accessoriesAvailable?"Yes":"No"}</span>
                </SubHeader>
                <SubHeader>
                  <span>Warranty Available</span>
                  <span>{product.warrantyAvailable?"Yes":"No"}</span>
                </SubHeader>
                <SubHeader>
                  <span>Purchased Year</span>
                  <span>
                    {" "}
                    {moment().subtract(product.age," years").format("YYYY")}(
                    {product.age} years ago)
                  </span>
                </SubHeader>
              </Details>
              <Divider/>
              <Details>
                <Header>
                  Seller Details
                </Header>
                <SubHeader>
                  <span>Name</span>
                  <span>{product.seller.name}</span>
                </SubHeader>
                <SubHeader>
                  <span>Email</span>
                  <TextTrans>{product.seller.email}</TextTrans>
                </SubHeader>
              </Details>
              <Divider/>
              <Details>
                <SubHeader>
                  <Header>
                    Bids
                  </Header>
                  <Button
                    onClick={()=>setShowAddNewBid(!showAddNewBid)}
                    disabled={user._id === product.seller._id}>
                      New Bid
                    </Button>
                </SubHeader>
                {
                  product.showBidsOnProductPage &&
                    product?.bids?.map((bid)=>{
                      return(
                        <BidOverlay>
                          <BidHeader>
                            <span>Name</span>
                            <span>{bid.buyer.name}</span>
                          </BidHeader>
                          <BidHeader>
                            <span>Bid Amount</span>
                            <span>{bid.bidAmount}</span>
                          </BidHeader>
                          <BidHeader>
                            <span>
                              {" "}
                              {moment(bid.createdAt).format("MMM D,YYYY hh:mm A")}
                            </span>
                          </BidHeader>
                        </BidOverlay>
                      )
                    })
                }
              </Details>
            </DetOverlay>
            {showAddNewBid&&(
              <BidModal
                product={product}
                reloadData={getData}
                showBidModal = {showAddNewBid}
                setShowBidModal={setShowAddNewBid}
              />)
            }
    </ProdOverlay>
    )
    
  )
}

export default ProductInfo
