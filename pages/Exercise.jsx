import React, { useState, useEffect } from 'react';
import { CategoryButton } from '../scripts/CategoryButton';
import { SelectedButton } from '../scripts/SelectedButton';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { clientSocket } from '../scripts/Socket';
import { GoogleOut } from '../scripts/GoogleLogout';
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Exercise() {
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
      clientSocket.on('Exercise', updateGoals)
      return () => {
        clientSocket.off('Exercise', updateGoals)
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

  return (
    <div> {/*className="root_container">*/}
      <div className="header_menu">
        <h2>Exercise</h2>
        <Avatar src={user.image} />
      </div>

      <div className="homepage_container">
        <ScrollToBottom>
        { goals.map((data, index) => (
          <div>
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
