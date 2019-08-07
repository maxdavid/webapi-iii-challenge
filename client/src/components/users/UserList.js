import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';
import styled from 'styled-components';

import User from './User';

const UserList = () => {
  const [{ users, getUsers }, dispatch] = useStateValue();

  useEffect(() => {
    getUsers(dispatch);
  }, []);

  return (
    <div>
      <Heading>
        <h1>Lord of the Rings Blog</h1>
      </Heading>
      <UserListContainer>
        {users.map(user => (
          <Link to={`users/${user.id}`}>
            <User key={user.id} {...user} />
          </Link>
        ))}
      </UserListContainer>
    </div>
  );
};

const UserListContainer = styled.div`
  width: 900px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 100px;
  column-gap: 20px;
  row-gap: 20px;
  margin: 10px auto;
`;

const Heading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: mediumaquamarine;
`;

export default UserList;
