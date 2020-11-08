import React, { useState, useEffect } from 'react';
import { clientSocket } from '../scripts/Socket';

export default function Content() {
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
      clientSocket.on("exercise", (data) => {
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
        <div>
            <h1>Home Page</h1>
            <h4>Category list will be on left side</h4>
            { dbDescription.map((data, index) => (
                <div>
                    <p>
                        {dbUserPrimary[index]}:
                        {data}:  
                        {dbPostText[index]}
                    </p>
                </div>)) }

        </div>
    );
}