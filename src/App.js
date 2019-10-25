import React, { useEffect, memo } from 'react';
import classes from './App.module.scss';
import { connect } from 'react-redux'
import { getAllUsersAction, changeDeportmentVisibilityStatusAction } from './store/actions/usersAction';
import Responsibility from './components/Responsibility';
import { iterationCopy } from './utils/cloningObject';
import Header from './components/Header';

const App = ({ loading, error, dispatch, usersArray }) => {
  // console.log(usersArray)
  useEffect(() => {
    dispatch(getAllUsersAction())
  }, [dispatch])
  function toggleDeportment(
    index
  ) {

    const newUsersArray = iterationCopy(usersArray);
    newUsersArray[index].show = newUsersArray[index].show === 0 ? 1 : 0;
    dispatch(changeDeportmentVisibilityStatusAction(newUsersArray));
  }

  return (
    <div className="App">

      {error ? "loading error" : null}

      {loading ? 'preloader' : <Header usersArray={usersArray} />}

      {usersArray.length ? <Responsibility usersArray={usersArray} /> : null}



      {/* todo change logic and append to header   */}


      <footer>
        {usersArray.map((deportament, index) => {
          return (
            <div key={`checkbox____${deportament.deportamentName}`}>
              <label>{deportament.deportamentName}</label>
              {/* todo change to deportament id  */}
              <input type="checkbox"

                checked={deportament.show}
                onChange={() => toggleDeportment(index)} />
            </div>
          )
        })}
      </footer>

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
