import React, { useState, useEffect } from 'react';
import { clientSocket } from '../scripts/Socket';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';


export default function AddGoal() {
    const [category, setCategory] = useState('');
    const [goal, setGoal] = useState('');
    
    const useStyles = makeStyles((theme) => ({
        formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
        },
        selectEmpty: {
        marginTop: theme.spacing(2),
        },
    }));

    
    const changeHandler_category = (event) => {
        setCategory(event.target.value);
    };
    
    const changeHandler_goal = (event) => {
        setGoal(event.target.value);
    };


    const clickHandler = () => {
        //Emit something here
    };
    
    return(
        <div>
            <h1>Add Goal Page</h1>
            <h3>User Name and Image here</h3>

            <h4>Select a Category:</h4>
            <FormControl className={useStyles().formControl}>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={changeHandler_category}
                >
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="School">School</MenuItem>
                <MenuItem value="Exercise">Exercise</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Art">Art</MenuItem>
                <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Misc">Misc</MenuItem>
                </Select>
            </FormControl>

            <h4>Enter Goal:</h4>
            <TextField
                  id="outlined-basic"
                  label="Enter your goal"
                  value={goal}
                  onChange={changeHandler_goal}
                />
            <Button variant="contained" 
                color="primary"
                onClick="clickHandler">
                Add!
            </Button>
            
        </div>
    );
}