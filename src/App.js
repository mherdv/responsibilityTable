import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { getAllUsers } from './store/actions/usersAction';

function App({ loading, error, dispatch, usersArray: users }) {

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div className="App">

      {error ? "loading error" : null}

      {/* todo create component for users action */}
      {loading ? 'preloader' :
        users.map(user => user)
      }
    </div>
  );
}

function mapStateToProps(store) {

  return store.users
}

export default connect(mapStateToProps)(App);
