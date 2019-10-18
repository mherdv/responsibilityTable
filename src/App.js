import React, { useEffect } from 'react';
import classes from './App.module.scss';
import { connect } from 'react-redux'
import { getAllUsers } from './store/actions/usersAction';

function App({ loading, error, dispatch, usersArray }) {

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div className="App">
      {error ? "loading error" : null}

      {/* todo create component for users action */}

      {loading ? 'preloader' :
        <header>

          {usersArray.map((deportament, index) => {
            return (
              <div key={`${deportament.name}_${deportament.id}_${index}`} className={classes.deportament}>

                <h4>{deportament.deportamentName}</h4>
                <div>
                  {deportament.users.map((user, index) => {
                    return <p key={`${user.name}_${user.id}_${index}`}>{user.fullName}</p>
                  })}
                </div>
              </div>
            )
          })}
        </header>
      }
    </div>
  );
}

function mapStateToProps(store) {

  return store.users
}

export default connect(mapStateToProps)(App);
