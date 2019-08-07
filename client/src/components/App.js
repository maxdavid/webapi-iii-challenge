import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { StateProvider } from '../state';
import { rootReducer } from '../reducers';
import { getUsers, getUserPosts, getUser } from '../actions';

import { UserList, UserPage } from './users';

function App() {
  const initialState = {
    currentUser: {},
    getUser: getUser,
    users: [],
    getUsers: getUsers,
    userPosts: [],
    getUserPosts: getUserPosts
  };

  return (
    <StateProvider initialState={initialState} reducer={rootReducer}>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={UserList} />
          <Route exact path='/users/:id' component={UserPage} />
        </Switch>
      </div>
    </StateProvider>
  );
}

export default App;
