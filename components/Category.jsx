import React, { useState, useEffect } from 'react';
import { Link }  from "react-router-dom";
import { CategoryButton } from '../scripts/CategoryButton'
import { SelectedButton } from '../scripts/SelectedButton'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';
import { clientSocket } from '../scripts/Socket';
import GoogleButton from '../scripts/GoogleButton'
import ScrollToBottom from 'react-scroll-to-bottom';
import { useHistory } from "react-router-dom";

function Category(props) {
  const { title, user, goals, categories } = props;
  const [categoryGoals, setCategoryGoals] = useState([]);
  const history = useHistory();
  useEffect(() => {
    console.log(title);
    console.log(history);
    
    clientSocket.emit('get_data', title);
      }, [title]);

   useEffect(() => {
      clientSocket.on(title, setCategoryGoals);
        }, [title]);


    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
    }));
  
  const classes = useStyles();

  return (
    <div className="root_container">
      <GoogleButton />
      
      <div className="category_menu">
        <br />
        {categories.map((category) => {
            return (
                <CategoryButton
                    category={category}
                    component={Link}
                    to={`/${category.toLowerCase()}`}
                    selected={category === title}
                />
            );
        })}
        <Button
            variant="contained"
            color="primary"
            onClick={() => {history.push('/GoalDigger')}}
            style={{ backgroundColor: '0e99b6' }}
          >
            GoalDigger
          </Button>
      </div>

      
      <div className="header_menu">
        <h2>{ title }</h2>
        <Button component={Link} to="/profile">
          <Avatar src={user.image} />
        </Button>
      </div>
        <ScrollToBottom className="newsfeed_container">
        { categoryGoals.map((data, index) => (
          <div>
            <div className="avatar">
            <Avatar src={data.img_url} className={classes.large} />
            </div>
            <b>
            {data.username}
            {' '}
            {data.progress}
            :
            {' '}
            {data.description}
            <br />
            <br/>
            </b>
            "
            {data.post_text}
            "

            <br />
            <br />
            <hr/>
          </div>
        )) }
        </ScrollToBottom>
      </div>
  );
}

export default Category;