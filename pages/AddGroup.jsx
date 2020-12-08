import React, { useState, useEffect  } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { clientSocket } from '../scripts/Socket';
import { GoogleOut } from '../scripts/GoogleLogout';
import { useHistory } from "react-router-dom";

export default function AddGroup() {
    const [groupCategory, setGroupCategory] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupSidebarText, setGroupSidebarText] = useState('');
    const [groupAdmin, setGroupAdmin] = useState('');
    const [groupNameList, setGroupNameList] = useState([]);
    const history = useHistory();
    
    function getGroupNameList(){
      React.useEffect(() => {
      clientSocket.on('group names list', updateGroupNameList);
      return () => {
        clientSocket.off('group names list', updateGroupNameList);
      };
    });
    }
    
    function updateGroupNameList(data) {
      console.log("data: ", data);
      console.log("all group names: ", data.all_group_names);
      setGroupNameList(data.all_group_names);
    }
    const changeHandler_groupCategory = (event) => {
        setGroupCategory(event.target.value);
    };
    
    const changeHandler_groupName = (event) => {
        setGroupName(event.target.value);
    };
    
    const changeHandler_groupDescription = (event) => {
        setGroupDescription(event.target.value);
    };
    
    const changeHandler_groupSidebarText = (event) => {
        setGroupSidebarText(event.target.value);
    };
    
    // const changeHandler_groupAdmin = (event) => {
    //     setGroupAdmin(event.target.value);
    // };
    
    const clickHandlerGroup = () => {
        clientSocket.emit('add_group', {
           groupCategory, groupName, groupDescription, groupSidebarText
        });
        setGroupName('');
        setGroupDescription('');
        setGroupSidebarText('');
        console.log('send group to the server: ', groupCategory, groupName, groupDescription, groupSidebarText);
    };
    
    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 300,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
    }));
    
    getGroupNameList();
    
    return (
      <div className="root_container">
      <Button
            variant="contained"
            color="primary"
            onClick={() => {history.push('/home')}}
            style={{ backgroundColor: '0e99b6' }}>
        Home
        </Button>
        <div className="content_container">
            <h2> Create Group </h2>
            <FormControl className={useStyles().formControl}>
          <InputLabel htmlFor="age-native-simple">Select a Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={groupCategory}
            onChange={changeHandler_groupCategory}
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
            <br />
            
            <FormControl className={useStyles().formControl}>
              <TextField
                id="outlined-basic"
                label="Enter your group's name"
                value={groupName}
                onChange={changeHandler_groupName}
              />
              <br />
    
              <TextField
                id="outlined-basic"
                label="Add a brief group description"
                value={groupDescription}
                onChange={changeHandler_groupDescription}
              />
              <br />
              
              <TextField
                id="outlined-basic"
                label="Add group info i.e. instagram handle"
                value={groupSidebarText}
                onChange={changeHandler_groupSidebarText}
              />
              <br />

            <Button
                variant="contained"
                color="primary"
                onClick={clickHandlerGroup}
                style={{ backgroundColor: '0e99b6' }}
              > Add Group!
          </Button>
        </FormControl>
      </div>
      </div>
    );
}