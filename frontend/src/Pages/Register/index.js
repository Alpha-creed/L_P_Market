import React, { useEffect } from "react";
import { styled } from "styled-components";
import background from "../../Assests/images/register.jpg";
import { Button, Form, Input, message } from "antd";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { RegisterUser } from "../../apicalls/users";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Register () {
  const Overlay = styled.div`
    minheight: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
  `;
  const LoginOv = styled.div`
  background: rgba(255, 255, 255, 0.6); /* Semi-transparent white background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px); /* Apply a blur effect to the background */
  position: relative; /* Raise the login container above the background */
  z-index: 1;
    width: 400px;
    text-align: center;
  `;
  const H3 = styled.h3`
    font-size: 25px;
  `;
  const LoginImg = styled.img`
    height: 50%;
  `;
  const Title = styled.span`
    color: "#405138";
    font-size: 25px;
  `;
  const BtnCover = styled.div`
    margin: 5px;
  `;
    const FooterCover = styled.div`
        text-align:center;
        margin:7px;
    `
    const Footer =styled.span`
        color:"#9E9E9E"
    `

    const dispatch = useDispatch()
    const navigate = useNavigate()
  const onFinish = async(values) => {
    try {
      dispatch(setLoader(true))
      const response = await RegisterUser(values);
      dispatch(setLoader(false))
      if(response.success){
        navigate("/login")
        message.success(response.message)
      }else{
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(setLoader(false))
      message.error(error.message)
    }
  };
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }
  },[])
  return (
    <Overlay>
      <LoginOv>
        <H3>
          L&P--
          <Title>REGISTER</Title>
        </H3>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <BtnCover>
          <Button type="primary" htmlType="submit" block>
           Register
          </Button>
          </BtnCover>
    <FooterCover>
        <Footer>
            Already have an account?<Link to="/login" style={{marginRight:"2px",color:"#405138",textDecoration:"none"}}>Login</Link>
        </Footer>
    </FooterCover>
        </Form>
      </LoginOv>
    </Overlay>
  );
};

export default Register;
