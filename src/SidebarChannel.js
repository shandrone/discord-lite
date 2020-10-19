import React from 'react'
import './SidebarChannel.css'
import ChatIcon from '@material-ui/icons/Chat';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from './features/appSlice';

function SidebarChannel({id, channelName}) {

    const dispatch = useDispatch()

    return (
        <div onClick={() => dispatch(setChannelInfo({
            channelId: id, channelName: channelName,

        }))} className = "sidebarChannel">
            <h4>
                <span className="sidebarChannel_hash">
                    <ChatIcon style={{ fontSize: 17 }} />
                </span>
                {channelName}
            </h4>
        </div>
    )
}

export default SidebarChannel
