import React, { useEffect } from 'react';
import './App.scss';
import { connect } from 'react-redux'
import { getAllUsersAction } from './store/actions/usersAction';
import Responsibility from './components/Responsibility';
import Header from './components/Header';

import { scrollLeftSetterActionCreator } from './store/actions/events/eventsAction';

import store from './store'

window.addEventListener('scroll', () => {
  const scrollLeft = store.getState().events.scrollLeft;

  if (scrollLeft !== document.documentElement.scrollLeft) {
    store.dispatch(scrollLeftSetterActionCreator())
  }
})



const html = document.querySelector('html');
let isDown = false;
let startX;
let scrollLeft;

html.addEventListener('mousedown', (e) => {
  isDown = true;
  html.classList.add('active');
  startX = e.clientX - html.offsetLeft;
  scrollLeft = html.scrollLeft;
});
html.addEventListener('mouseleave', () => {
  isDown = false;
  html.classList.remove('active');
});
html.addEventListener('mouseup', () => {
  isDown = false;
  html.classList.remove('active');
});
html.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.clientX - html.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  html.scrollLeft = scrollLeft - walk;
});




const App = ({ loading, error, dispatch, usersArray, scrollLeft }) => {

  useEffect(() => {
    dispatch(getAllUsersAction())



  }, [])

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
    usersArray: store.users.usersArray

  }
}

export default connect(mapStateToProps)(App);
