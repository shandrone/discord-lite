import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import {selectUser} from './features/userSlice'
import Login from './Login';
import { auth } from './firebase';
import {login, logout } from './features/userSlice'

function App() {

  //dispatch helps to bring things into data layer (in this case, Redux)
  const dispatch = useDispatch()
  //bringing user here from useSlice  
  const user = useSelector(selectUser)

  useEffect( () => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //use is logged in here
        dispatch(login({
          //setting user details
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      }
      else {
        //user is logged out here
        dispatch(logout())
      }

    })
  }, [dispatch])

  return (
    <div className='app'>
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
          <Login />
        )}
    </div>
  );
}

export default App;
