import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from "react-router-dom";
import { CategoryButton } from '../scripts/CategoryButton';
import { clientSocket } from '../scripts/Socket';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Avatar, Button } from '@material-ui/core';
import { Chat, addResponseMessage, addUserMessage, toggleInputDisabled } from 'react-chat-popup';
import Cookies from 'js-cookie';
import { Link }  from "react-router-dom";
import { useHistory } from "react-router-dom";
import GoogleButton from '../scripts/GoogleButton'
import './styles.css';

export default function GroupPage(props){
    const {path, url} = useRouteMatch()
    let { groupName } = useParams()
    const [groupGoals, setGroupGoals] = useState([]);
    const [groupInfo, setGroupInfo] = useState({});
    const title = "Welcome to " + groupName + "'s chatroom!"
    var placeholder = "type something"
    const history = useHistory();
    const { hasLoaded, setLoaded} = useState(false)

    useEffect(()=>{
        clientSocket.emit('group page', {"groupName": groupName})
    },[])
    
    function loadOldMessages(messages){
        console.log("cookies user id", Cookies.get("user_id"))
        console.log("cookies user obj", Cookies.get("userObj"))
        if (!hasLoaded){
            messages.map((data)=>{
                if (data.userId == Cookies.get("user_id")){
                    addUserMessage(data.message)
                }
                else{
                    let t = data.userId + ": " + data.message
                    addResponseMessage(t)
                }
            })
            setLoaded(true)
        }
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
        clientSocket.on("broadcast", handleBroadcast);
        return ()=>{clientSocket.off("broadcast", handleBroadcast)};
    },[]);
    
    function handleBroadcast(broadcastData){
        console.log("broadcasted: ", broadcastData);
        if ( groupName == broadcastData.groupName)
            addResponseMessage(broadcastData.newMessage);
    }
    

    React.useEffect(() => {
        if(!Cookies.get("isLoggedIn")){
            toggleInputDisabled()
            
        }
    }, []);
    
    function getGroupData(){
        React.useEffect(() => {
            clientSocket.on('group feed', updateGroupData);
            return () => {
                clientSocket.off('group feed', updateGroupData);
            };
        });
    }

    function updateGroupData(data) {
        console.log("data: ", data);
        setGroupGoals(data.group_goals);
        setGroupInfo(data.group_info);
        loadOldMessages(data.group_messages);
    }
    
    getGroupData();
    return (
    <div className="root_container">
        <div className="button_container">
            <GoogleButton />
        </div>
        <Button
            variant="contained"
            color="primary"
            onClick={() => {history.push('/home')}}
            style={{ backgroundColor: '0e99b6' }}>
        Home
        </Button>
        <Button
            variant="contained"
            color="primary"
            onClick={() => {history.push('/groups')}}
            style={{ backgroundColor: '0e99b6' }}>
        Groups
        </Button>
        <h2>Welcome to {groupName}'s group page!</h2>
        <Button
            variant="contained"
            color="primary"
            onClick={()=>{
                clientSocket.emit("join", {"groupId": groupInfo.groupId, "userId": Cookies.get("user_id")}) 
                console.log("joined groupid: ", groupInfo.groupId, Cookies.get("user_id"))
            }}
            style={{ backgroundColor: '0e99b6' }}>
        Join
        </Button>
        <div>This is our group's description: {groupInfo.group_description}</div>
        
        
        {groupGoals?
        <div className="homepage_container">
            
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
            
        </div>
        : <div>Error 404! This group doesn't exist</div>
        }
        
        <Chat 
        handleNewUserMessage={handleNewUserMessage}
        title={title}
        senderPlaceHolder={placeholder}
        />
    </div>
    )
}