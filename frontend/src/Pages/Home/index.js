import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../redux/loadersSlice';
import { GetProducts } from '../../apicalls/products';
import { styled } from 'styled-components';
import Filters from './Filters';
import { Divider, message } from 'antd';

const  Home=()=> {
  const [showFilters,setShowFilters] = useState(true);
  const [filter,setFilters] = useState({
    status:"approved",
    category:[],
    age:[],
  });
  const [product,setProduct]=useState([]);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.users);

  const getData = async()=>{
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(filter);
      dispatch(setLoader(false))
      if(response.success){
        setProduct(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false))
      message.error(error.message);
    }
  }

  useEffect(()=>{
    getData();
  },[filter]);
  const Overlay = styled.div`
    display:flex;
    gap:10px;
  `
  const FiltDiv = styled.div`
    display:flex;
    flex-direction:column;
    gap:20;
    width:100%;
    margin:15px 0;

  `
  const NavBar = styled.div`
    display:flex;
    gap:10px;
    align-items:center;
  `
  const FilterIcon = styled.i`
    font-size:25px;
    cursor:pointer;
  `
  const SearchBar = styled.input`
    border:1px solid #DEDEDE;
    border-radius:10px;
    width:100%;
    padding:10px;
    height:20px;
  `
  const ProductOverlay = styled.div`
    display:grid;
    grid-template-columns:${props=>props.showFilters?'repeat(4,minimax(0,1fr))':'repeat(5,minimax(0,1fr))'};
    gap:40px;
  `
  const ProductDetails = styled.div`
    border:1px solid #3F3131;
    border-radius:5px;
    display:flex;
    flex-direction:column;
    gap:5px;
    cursor:pointer;
  `
  const ProductImg = styled.img`
    width:100%;
    height:150px;
    object-fit:cover;
    padding:5px;
  `
  const ProductDiv=styled.div`
    padding:0 10px;
    display:flex;
    flex-direction:column;
  `
  const ProductName = styled.h1`
    font-size:18px;
    text-transform:capitalize;
  `
  const ProductAge=styled.p`
    font-size:12px;
  `
  const ProductPrice=styled.span`
    color:#20A10C;
  `
  return (
    <Overlay>
      {showFilters &&(
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filter}
          setFilters={setFilters}
        />
      )}
      <FiltDiv>
        <NavBar>
          {
            !showFilters &&(
              <FilterIcon 
                className="ri-equalizer-line"
                onClick={()=>setShowFilters(!showFilters)}
              ></FilterIcon>
            )
          }
          <SearchBar type="text" placeholder="Search Product here"/>          
        </NavBar>
          <ProductOverlay showFilters={showFilters}>
                {product?.map((prod)=>{
                  return(
                    <ProductDetails
                      key={prod}
                      onClick={()=>navigate(`/product/${product._id}`)}
                    > 
                      <ProductImg
                        src={prod.images[0]}
                        alt={prod.name}
                      />
                      <ProductDiv>
                          <ProductName>
                            {prod.name}
                          </ProductName>
                          <ProductAge>
                            {prod.age}
                            {' '}
                            {prod.age === 1 ?" year":" years"} old
                          </ProductAge>
                          <Divider/>
                          <ProductPrice>
                            ${prod.price}
                          </ProductPrice>
                      </ProductDiv>
                    </ProductDetails>
                  )
                })}
          </ProductOverlay>
      </FiltDiv>
    </Overlay>
  )
}

export default Home
