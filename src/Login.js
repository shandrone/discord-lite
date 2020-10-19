import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from './firebase'

function Login() {

    const signIn = () => {
        //Login option, authentication from firebase
        auth.signInWithPopup(provider).catch(error => alert(error.message) )
    }
    return (
        <div className="login">
            <h2>Please login to continue</h2>    

            <div className="login_logo">
             <img src="https://www.pngitem.com/pimgs/m/148-1489651_png-file-svg-chat-room-clip-art-transparent.png" alt=""/>
            </div>     
            <Button onClick = {signIn}>Login</Button>   
        </div>
    )
}

export default Login
