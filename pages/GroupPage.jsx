import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from "react-router-dom"
import { CategoryButton } from '../scripts/CategoryButton'
import { clientSocket } from '../scripts/Socket';


export default function GroupPage(){
    const {path, url} = useRouteMatch()
    let { groupName } = useParams()
    const [groupGoals, setGroupGoals] = useState([]);
        
    //THIS IS SO FOR STUFF I WANT TO RUN ONLY ONCE ON CONNECT
    clientSocket.on("connect", () => {
        console.log("socket id: ", clientSocket.id)
        console.log(groupName)
        console.log(path, url)
        clientSocket.emit('group page', {"groupName": groupName})
    })
    // group data fields:
    // {
    //     id
    //     category
    //     description
    //     name
    //     sidebar_text
    //     dateCreated
    //     newsFeed
    // }
    
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
        setGroupGoals(data)
    }
    
    getGroupGoals()
    
    return (
    <div className="root_container">
        This is a group page for {groupName}
        <div className="category_menu">
            <CategoryButton category="group1" />
            <CategoryButton category="group2" />
            <CategoryButton category="Create Group" />
        </div>
        <div>Stuff</div>
        {groupGoals?
        <div>{groupGoals.thing}</div>
        : <div>Error 404! This group doesn't exist</div>
        }
    </div>
    )
}