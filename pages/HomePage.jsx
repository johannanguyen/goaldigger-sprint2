import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { clientSocket } from '../scripts/Socket';
import { GoogleOut } from '../scripts/GoogleLogout';
import ScrollToBottom from 'react-scroll-to-bottom';

export default function HomePage() {
  const [dbId, setDbId] = useState([]);
  const [dbName, setDbName] = useState([]);
  const [dbEmail, setDbEmail] = useState([]);
  const [dbImage, setDbImage] = useState([]);
  const [dbBio, setDbBio] = useState([]);
  const [dbGoalId, setDbGoalId] = useState([]);
  const [dbCategory, setDbCategory] = useState([]);
  const [dbUserPrimary, setDbUserPrimary] = useState([]);
  const [dbDescription, setDbDescription] = useState([]);
  const [dbProgress, setDbProgress] = useState([]);
  const [dbDate, setDbDate] = useState([]);
  const [dbPostText, setDbPostText] = useState([]);
  const [newGoal, setNewGoal] = useState([]);
  const [users, setUsers] = useState({});

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
  }));

  function getGoogleUserInfo() {
    React.useEffect(() => {
      clientSocket.on('google info received', (data) => {
        console.log('Received this in the add goal section: ', data);
        setUsers(data);
      });
    });
  }
  getGoogleUserInfo();

  useEffect(() => {
    clientSocket.on('homepage', (data) => {
      setDbId(data.all_ids, []);
      setDbName(data.all_names, []);
      setDbEmail(data.all_emails, []);
      setDbImage(data.all_images, []);
      setDbGoalId(data.all_goal_ids, []);
      setDbCategory(data.all_categories, []);
      setDbUserPrimary(data.all_user_primary_ids, []);
      setDbDescription(data.all_descriptions, []);
      setDbProgress(data.all_progress, []);
      setDbDate(data.all_dates, []);
      setDbPostText(data.all_post_texts, []);
      console.log('Received something', data);
    });
  });

  function ChangePage() {
    location.href = '/UserProfile';
    // <button  onclick="ChangePage()">index.html</button>
  }
  /*
  function WorkPage() {
    location.href = '/Work';
    // <button  onclick="ChangePage()">index.html</button>
  }

  function SchoolPage() {
    location.href = '/School';
    // <button  onclick="ChangePage()">index.html</button>
  }

  function ExercisePage() {
    location.href = '/Exercise';
    // <button  onclick="ChangePage()">index.html</button>
  }

  function FoodPage() {
    location.href = '/Food';
    // <button  onclick="ChangePage()">index.html</button>
  }

  function ArtPage() {
    location.href = '/Art';
    // <button  onclick="ChangePage()">index.html</button>
  }

  function LifePage() {
    location.href = '/Life';
    // <button  onclick="ChangePage()">index.html</button>
  }

  function FinancePage() {
    location.href = '/Finance';
    // <button  onclick="ChangePage()">index.html</button>
  }

  function MiscPage() {
    location.href = '/Misc';
    // <button  onclick="ChangePage()">index.html</button>
  }

  function GroupsPage() {
    location.href = '/Groups';
    // <button  onclick="ChangePage()">index.html</button>
  }
*/
  // do div box styling for the week

  return (
    <div className="root_container">
      <GoogleOut/>
      <div className="category_menu">
        <br />
        <Button
          variant="contained"
          size="large"
          color="primary"
                        // onClick={WorkPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          Work
        </Button>

        <Button
          variant="contained"
          size="large"
          color="primary"
                        // onClick={SchoolPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          School
        </Button>

        <Button
          variant="contained"
          size="large"
          color="primary"
                        // onClick={ChangePage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          Exercise
        </Button>

        <Button
          variant="contained"
          size="large"
          color="primary"
                        // onClick={FoodPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          Food
        </Button>

        <Button
          variant="contained"
          size="large"
          color="primary"
                        // onClick={ArtPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          Art
        </Button>

        <Button
          variant="contained"
          size="large"
          color="primary"
                        // onClick={LifePage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          Lifetyle
        </Button>

        <Button
          variant="contained"
          size="large"
          color="primary"
                        // onClick={FinancePage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          Finance
        </Button>

        <Button
          variant="contained"
          size="large"
          color="primary"
                        // onClick={MiscPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          Misc
        </Button>

        <Button
          variant="contained"
          size="large"
          color="primary"
                        // onClick={GroupsPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          Groups
        </Button>
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

        <Avatar src={users.image} />
      </div>

      <div className="homepage_container">
        <ScrollToBottom>
        { dbUserPrimary.map((data, index) => (
          <div>
            <Avatar src={dbImage[data-1]} />

            {dbName[data - 1]}
            {' '}
            {dbProgress[index]}
            {' '}
            a goal in
            {' '}
            <b>{dbCategory[index]}</b>
            :
            {' '}
            {dbDescription[index]}
            <br />
            "
            {dbPostText[index]}
            "
          </div>
        )) }
        </ScrollToBottom>
      </div>
    </div>
  );
}
