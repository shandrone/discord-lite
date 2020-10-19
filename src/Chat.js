import React, { useEffect, useState } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddIcon from '@material-ui/icons/Add';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import firebase from 'firebase'


function Chat() {

    const channelId = useSelector(selectChannelId)
    const user = useSelector(selectUser)
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState([])
    const [message, setMessages] = useState([])

    //populating messages from db
    useEffect(() => {
        if (channelId) {
            db.collection("channels")
                .doc(channelId)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [channelId]);

    const sendMessage = e => {
        e.preventDefault() //after submitting, page wont refresh
        db.collection('channels').doc(channelId).collection('messages')
        .add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("")
    }
    
    return (
        <div className="chat">            
            <ChatHeader channelName={channelName} />
            <div className="chat_messages">
                <p className="chat_messages_tip">please select a channel first</p>
                {message.map((message) => (
                    <Message 
                    timestamp = {message.timestamp}
                    message = {message.message}
                    user = {message.user} />
                ))}

            </div>

            <div className="chat_input">
                {/* <AddIcon /> */}
                <form>
                    <input 
                    value={input} 
                    disabled = {!channelId}
                    onChange={e => setInput(e.target.value)} 
                    placeholder={`Type Message Here #${channelName}`}/>
                    <button 
                    disabled={!channelId}
                    onClick={sendMessage}
                    className="chat_inputButton"
                    type="submit"> <SendOutlinedIcon /> </button>
                </form>
                
            </div>
            
        </div>
    )
}

export default Chat
