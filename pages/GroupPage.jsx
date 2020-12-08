import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from "react-router-dom"
import { CategoryButton } from '../scripts/CategoryButton'
import { clientSocket } from '../scripts/Socket';
import ScrollToBottom from 'react-scroll-to-bottom';
import Avatar from '@material-ui/core/Avatar';


export default function GroupPage(){
    const {path, url} = useRouteMatch()
    let { groupName } = useParams()
    const [groupGoals, setGroupGoals] = useState([]);
    const [groupInfo, setGroupInfo] = useState({});

    //THIS IS SO FOR STUFF I WANT TO RUN ONLY ONCE ON CONNECT
    clientSocket.on("connect", () => {
        console.log("socket id: ", clientSocket.id)
        console.log(groupName)
        console.log(path, url)
        clientSocket.emit('group page', {"groupName": groupName})
    })

    function getGroupGoals(){
        React.useEffect(() => {
            clientSocket.on('group feed', updateGroupGoals)
            return () => {
                clientSocket.off('group feed', updateGroupGoals)
            }
        })
    }

    function updateGroupGoals(data) {
        console.log("data: ", data)
        setGroupGoals(data.group_goals)
        setGroupInfo(data.group_info)
    }

    getGroupGoals()

    return (
    <div className="root_container">
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
    </div>
    )
}