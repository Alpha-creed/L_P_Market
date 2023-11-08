import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {setLoader} from "../../../redux/loadersSlice"
import { EditProduct, UploadProductImage } from '../../../apicalls/products'
import {Button, Upload, message} from "antd"
import { styled } from 'styled-components'


function Images({
    selectedProduct,
    setShowProductForm,
    getData,
}) {
    const [images=[],setImages]=useState(selectedProduct.images)
    const [file=null,setFile]=useState(null)
    const [showPreview=false,setShowPreview] = useState(true)
    const dispatch=useDispatch();
    const upload =async()=>{
      try {
        dispatch(setLoader(true))
        //upload image to cloudinary
        const formData = new FormData();
        formData.append("file",file);
        formData.append("productId",selectedProduct._id)
        const response = await UploadProductImage(formData);
        dispatch(setLoader(false));
        if(response.success){
          message.success(response.message);
          setImages([...images,response.data]);
          setShowPreview(false)
          setFile(null)
          getData()
        }else{
          message.error(response.message);
        }
      } catch (error) {
        dispatch(setLoader(false))
        message.error(error.message)
      }
    }
    const deleteImages = async(image)=>{
      try {
        const updatedImagesArray = images.filter((img)=>img !== image)
        const updatedProduct = {...selectedProduct,images:updatedImagesArray}
        const response = await EditProduct(
          selectedProduct._id,
          updatedProduct
        )
        if(response.success){
          message.success(response.message);
          setImages(updatedImagesArray)
          setFile(null)
          getData()
        }else{
          throw new Error (response.message)
        }
        dispatch(setLoader(true))
      } catch (error) {
        dispatch(setLoader(false))
        message.error(error.message)
      }
    }

    const ImgOverlay =styled.div`
      display:flex;
      gap:15px;
      margin:10px 0;
    `
    const ImgDiv = styled.div`
      padding:3px;
      display:flex;
      gap:2;
      border:"1px solid #7C7C7C
      borderRadius:5px;
      align-items:end;
    `
    const Imgs = styled.img`
      height:100px;
      width:10px;
      object-fit:cover;
    `
    const CancelOverlay = styled.div`
      display:flex;
      justify-content:end;
      gap:7;
      margin-top:10px;
    `
  return (
    <div>
    <ImgOverlay>
      {
        images.map((img)=>{
          return (
            <ImgDiv>
              <Imgs style={{height:"100px",width:"100px",objectFit:"cover"}} src={img} alt="pic2"/>
              <i className="ri-delete-back-2-fill"
                onClick={()=>deleteImages(img)}
              ></i>
            </ImgDiv>
          )
        })
      }
    </ImgOverlay>
    <Upload
      listType="picture"
      beforeUpload={()=>false}
      onChange={(info)=>{
        setFile(info.file);
        setShowPreview(true)
      }}
      fileList={file?[file]:[]}
      showUploadList={showPreview}>
        <Button type='dashed'>
          Upload Image
        </Button>
      </Upload>
      <CancelOverlay>
        <Button type="primary"
          onClick={()=>{
            setShowProductForm(false)
          }}>
            Cancel
          </Button>
          <Button type="primary" disabled={!file} onClick={upload}>Upload</Button>
      </CancelOverlay>
    </div>
  )
}

export default Images
