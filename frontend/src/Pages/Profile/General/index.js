import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

function UserInfo() {
  const {user} = useSelector((state)=>state.users);
  const Overlay = styled.div`
    display:flex;
    flex-direction:column;
    width:30%;
  `
  const DetDesc = styled.span`
    color:#4A3F3F;
    display:flex;
    justify-content:space-between;
    font-size:20px;
  `
  const Bold = styled.b`
    font-size:15px;
  `
  return (
    <Overlay>
      <DetDesc>
        Name:<Bold>{user.name}</Bold>
      </DetDesc>
      <DetDesc>
        Email:<Bold>{user.email}</Bold>
      </DetDesc>
      <DetDesc>
        Created At:{" "}
        <Bold>
          {moment(user.createdAt).format("MMM D,YYYY hh:mm A")}
        </Bold>
      </DetDesc>
    </Overlay>
  )
}

export default UserInfo
