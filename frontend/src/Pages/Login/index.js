import React, { useEffect } from "react";
import { styled } from "styled-components";
import background from "../../Assests/images/login.png";
import { Button, Form, Input, message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { LoginUser } from "../../apicalls/users";
import { setLoader } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const Login=()=> {
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
    background: rgba(
      255,
      255,
      255,
      0.6
    ); /* Semi-transparent white background */
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
    text-align: center;
    margin: 7px;
  `;
  const Footer = styled.span`
    color: "#9E9E9E";
  `;
  const navigate = useNavigate("/");
  const dispatch=useDispatch();
  const onFinish = async(values) => {
      try {
        dispatch(setLoader(true))
        const response = await LoginUser(values);
        dispatch(setLoader(false))
        if(response.success){
          message.success(response.message);
          localStorage.setItem("token",response.data);
          window.location.href='/';
        }else{
          throw new Error(response.message)
        }
      } catch (error) {
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
          <Title>LOGIN</Title>
        </H3>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <BtnCover>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </BtnCover>
          <FooterCover>
            <Footer>
              Don't have an Account?
              <Link
                to="/register"
                style={{
                  marginRight: "2px",
                  color: "#405138",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </Footer>
          </FooterCover>
        </Form>
      </LoginOv>
    </Overlay>
  );
}

export default Login;
