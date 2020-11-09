import React, { useState, useEffect } from 'react';
import { clientSocket } from '../scripts/Socket';

export default function HomePage() {
    const [dbId, setDbId] = useState([]);
    const [dbName, setDbName] = useState([]);
    const [dbEmail, setDbEmail] = useState([]);
    const [dbImage, setDbImage] = useState([]);
    const [dbBio, setDbBio] = useState([]);
    const [dbGoalId, setDbGoalId] =  useState([]);
    const [dbCategory, setDbCategory] = useState([]);
    const [dbUserPrimary, setDbUserPrimary] = useState([]);
    const [dbDescription, setDbDescription] = useState([]);
    const [dbProgress, setDbProgress] = useState([]);
    const [dbDate, setDbDate] = useState([]);
    const [dbPostText, setDbPostText] = useState([]);
    

    useEffect(() => {
      clientSocket.on("homepage", (data) => {
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
      console.log("Received something", data);
      });
    });
    
    return(
        <div className="root_container">
            <div className="category_menu">
                <a href="">
                    <img src="https://i.ibb.co/xYVFr6J/gd-1-work.png"></img>
                </a>
                <a href="">
                    <img src="https://i.ibb.co/d6srXGM/gd-2-school.png"></img>
                </a>
                <a href="">
                    <img src="https://i.ibb.co/pndKdvW/gd-3-exercise.png"></img>
                </a>
                <a href="">
                    <img src="https://i.ibb.co/q7WzpTz/gd-4-food.png"></img>
                </a>
                <a href="">
                    <img src="https://i.ibb.co/QMgx3Q0/gd-5-art.png"></img>
                </a>
                <a href="">
                    <img src="https://i.ibb.co/Pm9R7MP/gd-6-lifestyle.png"></img>
                </a>
                <a href="">
                    <img src="https://i.ibb.co/Fx2JjyD/gd-7-finance.png"></img>
                </a>
                <a href="">
                    <img src="https://i.ibb.co/K6GfqjV/gd-8-misc.png"></img>
                </a>
            </div>
            
            
            <h2>Home Page</h2>
            <h4>Category list will be on left side</h4>
            { dbUserPrimary.map((data, index) => (
                <div>
                    <p>
                        {dbName[data-1]} {dbProgress[index]} a goal in <b>{dbCategory[index]}</b>: {dbDescription[index]}<br />
                        "{dbPostText[index]}"
                    </p>
                </div>)) }

        </div>
    );
}