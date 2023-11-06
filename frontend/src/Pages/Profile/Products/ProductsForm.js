import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../redux/loadersSlice';
import { AddProduct, EditProduct } from '../../../apicalls/products';
import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd';
import { styled } from 'styled-components';
import TextArea from 'antd/es/input/TextArea';
import Images from './images';


const additionalThings = [
    {
        label:"Bill Available",
        name:"billAvailable",
    },
    {
        label:"Warranty Available",
        name:"warrantyAvailable",
    },
    {
        label:"Accessories Available",
        name:"accessoriesAvialable",
    },
    {
        label:"Box Available",
        name:"boxAvailable"
    }
]
const rules = [
    {
        required:true,
        message:"required",
    }
]
function ProductsForm({showProductForm,setShowProductForm,selectedProduct,getData}) {
    const dispatch = useDispatch();
    const [selectedTab = "1",setSelectedTab] = useState("1");
    const {user} = useSelector((state)=>state.users);
    const onFinish = async(values)=>{
        try {
            dispatch(setLoader(true))
            let response = null;
            if(selectedProduct){
                response=await EditProduct(selectedProduct._id,values);
            }else{
                values.seller = user._id;
                values.status="pending";
                response = await AddProduct(values);
            }
            dispatch(setLoader(false));
            if(response.success){
                message.success(response.message);
                getData();
                setShowProductForm(false);
            }else{
                message.error(response.message);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    }
    const formRef = useRef(null);
    useEffect(()=>{
        if(selectedProduct){
            formRef.current.setFieldsValue(selectedProduct)
        }
},[selectedProduct]);
const initialValues = {};
//create an initial value object with each item's name set to false
additionalThings.forEach((item)=>{
    initialValues[item.name]=false;
})

    const ProductTitle = styled.h1`
        color:#405138;
        text-align:center;
        font-size:20px;
        font-style:semi-bold;
        text-transform:uppercase;
    `
    const AdditionalThings = styled.div`
        display:flex;
        gap:10;
    `
  return (
    <Modal
        title=""
        open={showProductForm}
        onCancel={()=>setShowProductForm(false)}
        centered
        width={1000}
        okText="Save"
        onOk={()=>{
            formRef.current.submit();
        }}
        {...(selectedTab==="2" &&{footer:false})}
    >
        <div>
            <ProductTitle>{selectedProduct?"Edit Product":"Add Product"}</ProductTitle>
       <Tabs defaultActiveKey='1' activeKey={selectedTab} onChange={(key)=>setSelectedTab(key)}>
        <Tabs.TabPane tab="General" key="1">
            <Form
                layout='vertical'
                ref={formRef}
                onFinish={onFinish}
                initialValues={initialValues}
            >
                <Form.Item label="Name" name="name" rules={rules}>
                    <Input type="text"/>
                </Form.Item>
                <Form.Item label="Description" name="description" rules={rules}>
                    <TextArea type="text"/>
                </Form.Item>
                <Row gutter={[16,16]}>
                    <Col span={8}>
                        <Form.Item label="Price" name="price" rules={rules}>
                            <Input type="number"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Brands" name="category" rules={rules}>
                            <select>
                                <option value="no-select">no-select</option>
                                <option value="hp">Hp</option>
                                <option value="lenovo">Lenovo</option>
                                <option value="acer">Acer</option>
                                <option value="samsung">Samsung</option>
                                <option value="tecno">Tecno</option>
                                <option value="iphone">Iphone</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Age" name="age" rules={rules}>
                            <Input type="number"/>
                        </Form.Item>
                    </Col>
                </Row>
                <AdditionalThings>
                    {additionalThings.map((item)=>{
                        return(
                            <Form.Item
                                label={item.label}
                                name={item.name}
                                valuePropName='checked'
                            >
                                <Input
                                    type="checkbox"
                                    value={item.name}
                                    onChange={(e)=>{
                                        formRef.current.setFieldsValue({
                                            [item.name]:e.target.checked,
                                        });
                                    }}
                                    checked={formRef.current?.getFieldValue(item.name)}
                                    />
                            </Form.Item>
                        )
                    })}
                </AdditionalThings>
                <Form.Item
                    label="Show Bids on Product Page"
                    name="showBidsOnProductPage"
                    valuePropName='checked'>
                        <Input 
                            type="checkbox"
                            onChange={(e)=>{
                                formRef.current.setFieldsValue({
                                    showBidsOnProductPage:e.target.checked,
                                })
                            }}
                            checked={formRef.current?.getFieldValue(
                                "showBisOnProductPage"
                            )}
                                style={{width:"10%"}}
                            />
                    </Form.Item>
            </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
            <Images/>
        </Tabs.TabPane>
        </Tabs>
        </div>
    </Modal>
  )
}

export default ProductsForm
