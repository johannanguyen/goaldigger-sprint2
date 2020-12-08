import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from "react-router-dom"
import { CategoryButton } from '../scripts/CategoryButton'
import { clientSocket } from '../scripts/Socket';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Avatar, Button } from '@material-ui/core';
import { Chat, addResponseMessage, addUserMessage, toggleInputDisabled } from 'react-chat-popup';
import Cookies from 'js-cookie'
import { Link }  from "react-router-dom";
import { useHistory } from "react-router-dom";


export default function GroupPage(props){
    const { user } = props;
    const {path, url} = useRouteMatch()
    let { groupName } = useParams()
    const [groupGoals, setGroupGoals] = useState([]);
    const [groupInfo, setGroupInfo] = useState({});
    const title = "Welcome to " + groupName + "'s chatroom!"
    var placeholder = "Type a message..."
    const history = useHistory();

    //THIS IS SO FOR STUFF I WANT TO RUN ONLY ONCE ON CONNECT
    
    useEffect(()=>{
        clientSocket.emit('group page', {"groupName": groupName})
    },[])
    
    
    function loadOldMessages(messages){
        console.log(Cookies.get("user_id"))
        messages.map((data)=>{
            if (data.userId == Cookies.get("user_id")){
                addUserMessage(data.message)
            }
            else{
                let t = data.userId + ": " + data.message
                addResponseMessage(t)
            }
                
        })
    }

    function handleNewUserMessage(newUserMessage){
        clientSocket.emit("newUserMessage",
        {
            "groupName": groupName,
            "groupId": groupInfo.groupId,
            "newUserMessage": newUserMessage,
            "userId": Cookies.get("user_id")
        })
        
    }
    
    React.useEffect(()=>{
        clientSocket.on("broadcast", handleBroadcast)
        return ()=>{clientSocket.off("broadcast", handleBroadcast)}
    },[])
    
    function handleBroadcast(broadcastData){
        console.log("broadcasted: ", broadcastData)
        if ( groupName == broadcastData.groupName)
            addResponseMessage(broadcastData.newMessage)
    }
    

    React.useEffect(() => {
        if(!Cookies.get("isLoggedIn")){
            toggleInputDisabled()
            placeholder = "You need to login first!"
        }
    }, [])
    
    function getGroupData(){
        React.useEffect(() => {
            clientSocket.on('group feed', updateGroupData)
            return () => {
                clientSocket.off('group feed', updateGroupData)
            }
        })
    }

    function updateGroupData(data) {
        console.log("data: ", data)
        setGroupGoals(data.group_goals)
        setGroupInfo(data.group_info)
        loadOldMessages(data.group_messages)
    }
    
    getGroupData()
    return (
    <div className="root_container">
    
        <Button
            variant="contained"
            color="primary"
            onClick={() => {history.push('/home')}}
            style={{ backgroundColor: '0e99b6' }}>
        Home
        </Button>
        
        <h2>Welcome to {groupName}'s group page!</h2>
        <div>This is our group's description: {groupInfo.group_description}</div>
        <div className="category_menu">
            <CategoryButton category="group1" />
            <CategoryButton category="group2" />
            <CategoryButton category="Create Group" />
        </div>
        {groupGoals?
        <div className="homepage_container">
            <ScrollToBottom>
            { groupGoals.map((data, index) => (
              <div key={index}>
                <Avatar src={data.img_url} />
                {data.username}
                {' '}
                {data.progress}
                {' '}
                a goal in
                {' '}
                <b>{data.category}</b>
                :
                {' '}
                {data.description}
                <br />
                "
                {data.post_text}
                "
              </div>
            )) }
            </ScrollToBottom>
        </div>
        : <div>Error 404! This group doesn't exist</div>
        }
        <div>This is the sidebar text that should go as a right-sided column: {groupInfo.sidebar_text}</div>
        <Chat 
        handleNewUserMessage={handleNewUserMessage}
        title={title}
        senderPlaceHolder={placeholder}
        />
    </div>
    )
}