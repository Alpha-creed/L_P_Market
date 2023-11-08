import React from 'react'
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {setLoader} from "../redux/loadersSlice"
import {message,Modal} from "antd"
import moment from "moment"
import {styled} from "styled-components"

function Notice({
    notification=[],
    reloadNotification,
    showNotification,
    setShowNotification,
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const DeleteNotice = async(id)=>{
        try {
            dispatch(setLoader(true));
            const response = await DeleteNotice(id);
            dispatch(setLoader(false))
            if(response.success){
                message.success(response.message);
                reloadNotification()
            }else{
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message)
        }
    }
    const Overlay = styled.div`
        display:flex;
        flex-direction:column;
        gap:10px;
    `
    const NotiOverlay = styled.div`
        cursor:pointer;
        display:flex;
        flex-direction:column;
        gap:5px;
        padding:5px;
        border:1px solid #989393;
    `
    const NotiDetail = styled.div`
        display:flex;
        justify-content:space-between;
        align-items:center;
    `
    const H4 = styled.h4`
        color:#666363
    `
    const NotiMess = styled.span`
        color:#989393;
    `
    const NotiTime = styled.h5`
        color:#989393;
    `
  return (
    <Modal
        title="Notifications"
        open={showNotification}
        onCancel = {()=>setShowNotification(false)}
        footer={null}
        centered
        width={1000}
        >
            <Overlay>
                {notification.map((notice)=>{
                    <NotiOverlay key={notice._id}>
                        <NotiDetail>
                            <div
                                onClick={()=>{
                                    navigate(notice.onClick)
                                    setShowNotification(false)
                                }}
                            >
                                <H4>
                                    {notice.title}
                                </H4>
                                <NotiMess>
                                    {notice.message}
                                </NotiMess>
                                <NotiTime>
                                    {moment(notice.createdAt).fromNow()}
                                </NotiTime>
                            </div>
                            <i className="ri-delete-back-2-fill"
                                onClick={()=>{
                                    DeleteNotice(notice._id)
                                }}
                            ></i>
                        </NotiDetail>
                    </NotiOverlay>
                })}
            </Overlay>
    </Modal>
  )
}

export default Notice
