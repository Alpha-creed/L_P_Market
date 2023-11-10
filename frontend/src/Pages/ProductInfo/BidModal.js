import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { PlaceNewBid } from "../../apicalls/products";
import { Form, Input, Modal, message } from "antd";
import { styled } from "styled-components";
import { AddNotification } from "../../apicalls/notice";

function BidModal({ showBidModal, setShowBidModal, product, reloadData }) {
  const formRef = useRef(null);
  const rules = [
    {
      required: true,
      message: "Required",
    }
  ];
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      dispatch(setLoader(false));
      if (response.success) {
        message.success("Bid added successfully");
        //send notification to seller
        // await AddNotification({
        //   title: "A new bid has been placed",
        //   message: `A new bid has been placed on your ${product.name}
        //             by ${user.name} for ${values.bidAmount}`,
        //   user: product.seller._id,
        //   onClick: `/profile`,
        //   read: false,
        // });
        reloadData();
        setShowBidModal(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(setLoader(false));
    }
  };
  const BidOverlay = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 10px 0;
  `;
  const BidTitle = styled.h1`
    font-size: 20px;
    color: #660000;
    text-align: center;
  `;

  return (
    <Modal
      onCancel={() => setShowBidModal(false)}
      open={showBidModal}
      centered
      width={600}
      onOk={() => formRef.current.submit()}
    >
      <BidOverlay>
        <BidTitle>Place a Bid</BidTitle>
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item rules={rules} label="Bid Amount" name="bidAmount">
            <Input />
          </Form.Item>
          <Form.Item rules={rules} label="Message" name="message">
            <Input.TextArea />
          </Form.Item>
          <Form.Item rules={rules} label="Mobile" name="mobile">
            <Input type="number" />
          </Form.Item>
        </Form>
      </BidOverlay>
      <h1>Place a bid</h1>
    </Modal>
  );
}

export default BidModal;
