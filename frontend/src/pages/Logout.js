import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const PageBackground = styled.div`
    background-color: #85769f66;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
    return (
      <PageBackground>
      <LogoutContainer>
      <UserName>{currentUser.name}</UserName>
          <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
          <ButtonContainer>
              <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
              <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
          </ButtonContainer>
      </LogoutContainer>
  </PageBackground>
    );
};

export default Logout;

const LogoutContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 40px;
  
    background-color: #fff; 
    color: black;
  
    align-items: center;
`;
const UserName = styled.h1`
   text-align: center;
   font-size:2rem;
   font-family: 'Times New Roman', Times, serif;
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

const LogoutButton = styled.button`
  padding: 6px 12px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ea0606;
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: rgb(99, 60, 99);
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content:space-around;
    width: 100%;
    margin-top: 10px;
`;