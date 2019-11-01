import React, { useEffect } from 'react';
import './App.scss';
import { connect } from 'react-redux'
import { getAllUsersAction } from './store/actions/usersAction';
import Responsibility from './components/Responsibility';
import Header from './components/Header';




const App = ({ loading, error, dispatch, usersArray }) => {

  useEffect(() => {
    dispatch(getAllUsersAction())
  }, [dispatch])

  return (
    <div className="App">

      {error ? "loading error" : null}

      {loading ? 'preloader' : <Header usersArray={usersArray} />}

      {usersArray.length ? <Responsibility /> : null}



    </div>
  );
}


function mapStateToProps(store) {
  return {
    loading: store.users.loading,
    error: store.users.error,
    usersArray: store.users.usersArray,
  }
}

export default connect(mapStateToProps)(App);
