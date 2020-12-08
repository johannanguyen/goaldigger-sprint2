import React, { useState, useEffect } from 'react';
import { Link }  from "react-router-dom";
import { CategoryButton } from '../scripts/CategoryButton'
import { SelectedButton } from '../scripts/SelectedButton'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';
import { clientSocket } from '../scripts/Socket';
import { GoogleOut } from '../scripts/GoogleLogout';
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



  return (
    <div className="root_container">
      <GoogleOut/>
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
      </div>

      <div className="header_menu">
        <h2>{ title }</h2>
        <Button component={Link} to="/profile">
          <Avatar src={user.image} />
        </Button>
      </div>

      <div className="homepage_container">
        <ScrollToBottom>
        { categoryGoals.map((data, index) => (
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

export default Category;