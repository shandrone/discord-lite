import React from 'react'
import './ChatHeader.css'
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import LiveHelpOutlinedIcon from '@material-ui/icons/LiveHelpOutlined';

function ChatHeader({channelName}) {
    return (
        <div className="chatHeader">            
            <div className="chatHeader_left">
                <h3>
                    <span className="chatHeader_hash">
                        #
                    </span>
                    {channelName}
                </h3>
            </div>

            <div className="chatHeader_right">
                <NotificationsActiveOutlinedIcon />
                <EditOutlinedIcon />
                <GroupOutlinedIcon />

                <div className="chatHeader_search">
                    <input placeholder="Search (UI only)"/>
                    <SearchOutlinedIcon />
                </div>
                <SendOutlinedIcon />
                <LiveHelpOutlinedIcon />

            </div>
        </div>
    )
}

export default ChatHeader
