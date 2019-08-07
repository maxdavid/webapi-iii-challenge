import React from 'react';
import styled from 'styled-components';

const User = props => {
  return (
    <UserContainer>
      <h2>{props.name}</h2>
    </UserContainer>
  );
};

const UserContainer = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #ef7d79;
  color: #2a2a2a;
`;

export default User;
