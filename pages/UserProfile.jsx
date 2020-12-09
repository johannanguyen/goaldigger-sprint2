import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import { clientSocket } from '../scripts/Socket';
import GoogleButton from '../scripts/GoogleButton';
import { Link }  from "react-router-dom";
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom"

export default function UserProfile(props) {
  const { goals, user } = props;
  const history = useHistory()
  
  const [boolins, setBoolins] = React.useState([]);
  
  const [hearts, setHearts] = React.useState([]);
  const [smileys, setSmileys] = React.useState([]);
  const [thumbs, setThumbs] = React.useState([]);
  
  
  function makeComplete(task) {
    //send index thorugh socket run alter table querary on backend where id = index
    clientSocket.emit('new complete input', {
      completion: task, // sends pName to socket
    });
    event.preventDefault();
    console.log(task);
  };

  function makeDelete(task) {
    clientSocket.emit('new delete input', {
      deletion: task, // sends pName to socket
    });
    event.preventDefault();
    console.log(task);
  };
  
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
    
<Button
            variant="contained"
            color="primary"
            onClick={() => {history.push('/home')}}
            style={{ backgroundColor: '0e99b6' }}
          >
            Home
          </Button>
      <GoogleButton/>
      <div className="content_container">
        <h1>{user.username}</h1>
        <br />

        <img src={user.image} />
        <br />
        <br />

        <h3>Here's a list of my goals:</h3>
        <div className="goal_container">
          { goals.map((data, index) => (
            <div>
              <b>
                {data.progress}
                :
              </b>
              {' '}
              {data.description}
              <button type="button" onClick={() => makeComplete(data.description)}>
                Done
              </button>
              <button type="button" onClick={() => makeDelete(data.description)}>
                Delete
              </button>
              <button type="button" onClick={() => Heart(data.description)}>
                &#10084;&#65039;
              </button>
              <button type="button" onClick={() => Smiley(data.description)}>
                &#128512;
              </button>
              <button type="button" onClick={() => Thumb(data.description)}>
                &#128077;
              </button>            
              <br />
            </div>
          ))}
        </div>
      </div>
      <div align="right">
      <Button component={Link} to="/add">
        <Fab color="primary" size="small" style={{ backgroundColor: '0e99b6' }}>
          +
        </Fab>
      </Button>
      </div>
    </div>
  );
}