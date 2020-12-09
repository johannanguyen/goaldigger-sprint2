import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from "react-router-dom"
import { CategoryButton } from '../scripts/CategoryButton'
import { clientSocket } from '../scripts/Socket';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Avatar, Button } from '@material-ui/core';
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import GoogleButton from '../scripts/GoogleButton'
import './styles.css';

export default function GroupHome(props){
    const {gNames, gGoals} = props
    const history = useHistory()
    
    
    
    
    

    
    
    
    return (
    <div className="root_container">
        <div className="button_container">
            <GoogleButton />
        </div>
        <h2>This is your groups homepage!</h2>
        <div className="category_menu">
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {history.push('/home')}}
                style={{
                backgroundColor: '0e99b6',
                minHeight: '53px',
                minWidth: '170px',
                border: '1px solid white',
             }}>
            Home
            </Button>
            {gNames.map((data,index)=>(
            <Button key={index} size="large" variant="contained" color="primary" onClick={()=> {history.push('/groups/'+data)}} 
            style={{
                backgroundColor: '0e99b6',
                minHeight: '53px',
                minWidth: '170px',
                border: '1px solid white',
             }}>
            {data}
            </Button>
            ))
            }
        </div>
        {gNames?
        <div className="homepage_container">
            { gGoals.map((data, index) => (
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
        :<div>
            Join groups so that you can see their user's goals here!
        </div>
        }
        
    </div>
    )
    
    
}