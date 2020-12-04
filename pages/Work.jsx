import React, { useState, useEffect } from 'react';
import { CategoryButton } from '../scripts/CategoryButton'
import { SelectedButton } from '../scripts/SelectedButton'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { clientSocket } from '../scripts/Socket';
import { GoogleOut } from '../scripts/GoogleLogout';
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Work() {
  const [goals, setGoals] = useState([]);
  const [user, setUser] = useState({});

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
  }));
  
  function getGoals(){
    React.useEffect(() => {
      clientSocket.on('Work', updateGoals)
      return () => {
        clientSocket.off('Work', updateGoals)
      }
    })
  }
  
  function updateGoals(data) {
    setGoals(data)
    console.log("TEST WORK GOAL", data)
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


  return (
    <div className="root_container">
      <GoogleOut/>
      <div className="category_menu">
        <br />
        <CategoryButton category="Home" />
        <SelectedButton category="Work" />
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
        <h2>Work</h2>
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

            {data.username}
            {' '}
            <b>{data.progress}</b>
            {' '}
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
    </div>
  );
}
