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
      {/*
      <Button
        variant="contained"
        size="large"
        color="white"
        onClick={GoBack}
        style={{
          backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
        }}
      >
        Back
      </Button>
      */}
      <div className="content_container">
        <h1>{user.username}</h1>
        <br />

        <img src={user.image} />
        <br />
        <br />
        {/*
        <Button
          variant="contained"
          size="large"
          color="white"
          onClick={ChangePage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          Add Goal
        </Button>
        */}

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