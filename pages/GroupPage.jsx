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
<<<<<<< HEAD
    const {path, url} = useRouteMatch()
    let { groupName } = useParams()
    const [groupGoals, setGroupGoals] = useState([]);
    const [groupInfo, setGroupInfo] = useState({});
    const title = "Welcome to " + groupName + "'s chatroom!"
    const { placeholder, setPlaceholder } = useState("Type a message...")
=======
    const { user } = props;
    const {path, url} = useRouteMatch();
    let { groupName } = useParams();
    const [groupGoals, setGroupGoals] = useState([]);
    const [groupInfo, setGroupInfo] = useState({});
    const title = "Welcome to " + groupName + "'s chatroom!";
    var placeholder = "Type a message...";
>>>>>>> master
    const history = useHistory();
    const { hasLoaded, setLoaded} = useState(false)

<<<<<<< HEAD
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
=======
  //THIS IS SO FOR STUFF I WANT TO RUN ONLY ONCE ON CONNECT
    
    useEffect(()=>{
        clientSocket.emit('group page', {"groupName": groupName})
    },[])

    
    function loadOldMessages(messages){
        console.log(Cookies.get("user_id"));
        messages.map((data)=>{
            if (data.userId == Cookies.get("user_id")){
                addUserMessage(data.message);
            }
            else{
                let t = data.userId + ": " + data.message;
                addResponseMessage(t);
            }
                
        });
>>>>>>> master
    }

    function handleNewUserMessage(newUserMessage){
        clientSocket.emit("newUserMessage",
        {
            "groupName": groupName,
            "groupId": groupInfo.groupId,
            "newUserMessage": newUserMessage,
            "userId": Cookies.get("user_id")
<<<<<<< HEAD
        })
=======
        });
        
>>>>>>> master
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
<<<<<<< HEAD
            toggleInputDisabled()
            setPlaceholder("You need to login first!")
=======
            toggleInputDisabled();
            placeholder = "You need to login first!";
>>>>>>> master
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
    
<<<<<<< HEAD
    getGroupData()
    
=======
    getGroupData();
>>>>>>> master
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
        <div>This is our group's description: {groupInfo.group_description}</div>
<<<<<<< HEAD
        <div>This is the sidebar text that should go as a right-sided column: {groupInfo.sidebar_text}</div>
=======
        <div className="category_menu">
            <CategoryButton category="group1" />
            <CategoryButton category="group2" />
            <Button 
            size="large" 
            variant="contained"
            color="primary"
            onClick={() => {history.push('/addgroup')}}
            // style={{ backgroundColor: '0e99b6' }}
            style={{ backgroundColor: '7a8391' }} 
            >
            Add Group
          </Button>
        </div>
        
>>>>>>> master
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