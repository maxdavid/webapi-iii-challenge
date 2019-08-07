import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';
import styled from 'styled-components';

const UserPage = props => {
  const [
    { currentUser, userPosts, getUserPosts, getUser },
    dispatch
  ] = useStateValue();
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const { id } = props.match.params;
    getUser(dispatch, id);
  }, []);

  useEffect(() => {
    const { id } = props.match.params;
    getUserPosts(dispatch, id);
  }, []);

  return (
    <div>
      <Heading>
        <Link to='/'>Back</Link>
        <h1>{currentUser.name}</h1>
      </Heading>
      <UserPostsContainer>
        {userPosts.map(post => (
          <PostContainer key={post.id}>{post.text}</PostContainer>
        ))}
      </UserPostsContainer>
    </div>
  );
};

const UserPostsContainer = styled.div`
  width: 900px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 100px;
  column-gap: 20px;
  row-gap: 20px;
  margin: 10px auto;
`;

const PostContainer = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #ef7d79;
  color: #2a2a2a;
  height: 50px;
`;

const Heading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: mediumaquamarine;
  h1 {
    width: 100%;
  }
`;

export default UserPage;
