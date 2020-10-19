import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import AddIcon from "@material-ui/icons/Add"
import SidebarChannel from './SidebarChannel';
import SignalCellularOffIcon from '@material-ui/icons/SignalCellularOff';
import PhoneIcon from '@material-ui/icons/Phone';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import { Avatar } from '@material-ui/core';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import HeadsetMicOutlinedIcon from '@material-ui/icons/HeadsetMicOutlined';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';
import DescriptionIcon from '@material-ui/icons/Description';

function Sidebar() {

    const user = useSelector(selectUser) //need this to make sure logout option works
    const [channels, setChannels] = useState([]) 

    useEffect(() => {
        //find channels from firebase database
        //onsnapshot - any change on channels will update it
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data()
            })))
        ))
    },[])

    const handleAddChannel = () => {
        const channelName = prompt("Enter new channel name")
        //is user added a channel name then go to firebase database > channels and add the new channel name
        //it will trigger the useEffect above
        if (channelName) {
            db.collection('channels').add({
                channelName: channelName
            })
        }
    }



    return (
        <div className = "sidebar">            
            <div className = "sidebar">
                <div className="sidebar_top">
                    <h3>Discord lite</h3>
                    
                </div>
            </div>
            
            <div className="sidebar_channels">
                <div className="sidebar_channelsHeader">
                    <div className="sidebar_header">
                        <DescriptionIcon />                        
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar_addChannel"/>                    
                </div>

                <div className="sidebar_channelsList">
                {/* map through evry channel and return the sidebar channels */}
                    {channels.map(({id, channel}) => ( 
                        <SidebarChannel key = {id} id= {id} channelName = {channel.channelName} />

                    ))}                  
                    
                </div>
            </div>  

            <div className="sidebar_voice">
                <SignalCellularOffIcon className="sidebar_voiceIcon"
                fontSize = "large" />
                <div className="sidebar_voiceInfo">
                    <h3>
                        Voice NOT Connected
                    </h3>
                    <p>voice options UI element only</p>                    
                </div>
                <div className="sidebar_voiceIcon">
                    <PhoneIcon />
                    <ContactSupportOutlinedIcon />
                </div>
            </div> 
            <div className="sidebar_profile">
                <Avatar  src= {user.photo} />
                <div className="sidebar_profileInfo">
                    <h3> {user.displayName} </h3>
                    <p onClick= {() => auth.signOut()}> Logout </p>                    
                </div>

                <div className="sidebar_profileIcons">
                    <MicOffOutlinedIcon />
                    <HeadsetMicOutlinedIcon />
                    <SettingsApplicationsOutlinedIcon />
                    <p className="sidebar_profileIconsText">options UI element only</p>

                </div>
            </div>         
        </div>
    )
}

export default Sidebar
