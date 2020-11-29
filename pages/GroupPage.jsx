import React from 'react';
import { useParams, useRouteMatch } from "react-router-dom"

export default function GroupPage(){
    const {path, url} = useRouteMatch()
    console.log(path, url)
    let { groupName } = useParams()
    console.log(groupName)
    
    return <div>This is a group page for {groupName}</div>
}