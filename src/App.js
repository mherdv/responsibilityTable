import React, { useEffect, memo } from 'react';
import classes from './App.module.scss';
import { connect } from 'react-redux'
import { getAllUsers, changeDeportmentVisibilityStatus } from './store/actions/usersAction';
import Responsibility from './components/Responsibility';
import { iterationCopy } from './utils/cloningObject';

const App = memo(({ loading, error, dispatch, usersArray }) => {
  // console.log(usersArray)
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  function toggleDeportment(
    index
  ) {

    const newUsersArray = iterationCopy(usersArray);
    newUsersArray[index].show = newUsersArray[index].show === 0 ? 1 : 0;
    dispatch(changeDeportmentVisibilityStatus(newUsersArray));
  }

  return (
    <div className="App">
      {error ? "loading error" : null}

      {/* todo create component for users header */}

      {loading ? 'preloader' :
        <header>

          {usersArray.map((deportament, index) => {
            return (

              deportament.show ?
                <div style={{ width: deportament.users.length * 44 + "px" }} key={`${deportament.name}_${deportament.id}_${index}`} className={classes.deportament}>

                  <h4>{deportament.deportamentName}</h4>
                  <div>
                    {deportament.users.map((user, index) => {
                      return <p key={`${user.name}_${user.id}_${index}`}>{user.fullName}</p>
                    })}
                  </div>
                </div> : null
            )
          })}
        </header>


      }
      {usersArray.length ?

        <Responsibility usersArray={usersArray} />
        : null}

      {/* todo create component for fixed footer  */}

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
}, (next, prev) => {
  // console.log(next.usersArray, prev.usersArray)
})


function mapStateToProps(store) {
  return {
    loading: store.users.loading,
    error: store.users.error,
    usersArray: store.users.usersArray,
  }
}

export default connect(mapStateToProps)(App);
