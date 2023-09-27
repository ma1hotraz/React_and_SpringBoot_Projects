import React from 'react'
import styled from "styled-components";
import '../css/Login.css'
import AccountBox from '../component/accountBox'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F4F4F4 !important;
  margin-top: 4%;
`;

export default function Login() {
    return <AppContainer>
        <AccountBox />
    </AppContainer>
}

