import React, { useState, useEffect } from 'react';
import { CategoryButton } from '../scripts/CategoryButton'
import { SelectedButton } from '../scripts/SelectedButton'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { clientSocket } from '../scripts/Socket';
import ScrollToBottom from 'react-scroll-to-bottom';
import GroupPage from './GroupPage';
import GoogleButton from '../scripts/GoogleButton'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from "js-cookie"


export default function HomePage() {
  const [goals, setGoals] = useState([]);
  const [user, setUser] = useState({});

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
  }));

  console.log("On Connect, cookies: ", Cookies.get())

  function getGoals(){
    React.useEffect(() => {
      clientSocket.on('homepage', updateGoals)
      return () => {
        clientSocket.off('homepage', updateGoals)
      }
    })
  }
  
  function updateGoals(data) {
    setGoals(data)
  }
  
  function getGoogleUserInfo() {
    React.useEffect(() => {
      clientSocket.on('google info received', (data) => {
        console.log('Received this in the add goal section: ', data);
        setUser(data);
      });
    });
  }
  getGoogleUserInfo();
  getGoals();
  // do div box styling for the week
  
  function Heart(task) {
    clientSocket.emit('new hearts input', {
      heart: task, // sends pName to socket
    });
    event.preventDefault();
    console.log(task);
  };
  
  function Smiley(task) {
    clientSocket.emit('new smileys input', {
      smiley: task, // sends pName to socket
    });
    event.preventDefault();
    console.log(task);
  };
  
  function Thumb(task) {
    clientSocket.emit('new thumbs input', {
      thumb: task, // sends pName to socket
    });
    event.preventDefault();
    console.log(task);
  };
  
  

  return (
    <div className="root_container">
      
      <GoogleButton />
      <div className="category_menu">
        <br />
        <SelectedButton category="Home" />
        <CategoryButton category="Work" />
        <CategoryButton category="School" />
        <CategoryButton category="Exercise" />
        <CategoryButton category="Food" />
        <CategoryButton category="Art" />
        <CategoryButton category="Lifestyle" />
        <CategoryButton category="Finance" />
        <CategoryButton category="Misc" />
        <CategoryButton category="Groups" />
      </div>

      <div className="header_menu">
        <h2>Home</h2>
        {/*
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={ChangePage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
        
          User Profile
        </Button>
        */}

        <Avatar src={user.image} />
      </div>

      <div className="homepage_container">
        <ScrollToBottom>
        { goals.map((data, index) => (
          <div key={index}>
            <Avatar src={data.img_url} />

            {data.name}
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
            {' '}
            {data.hearts}
            {' '}
            {data.smileys}
            {' '}
            {data.thumbs}
            {' '}
            
            <button type="button" onClick={() => Heart(data.description)}>
                &#10084;&#65039;
              </button>
              <button type="button" onClick={() => Smiley(data.description)}>
                &#128512;
              </button>
              <button type="button" onClick={() => Thumb(data.description)}>
                &#128077;
              </button>          
          </div>
        )) }
        </ScrollToBottom>
      </div>
    </div>
  );
}
