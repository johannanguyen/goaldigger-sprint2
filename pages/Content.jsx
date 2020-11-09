import * as React from 'react';
import LandingPage from './LandingPage';
import HomePage from  './HomePage';
import UserProfile from './UserProfile';
import AddGoal from './AddGoal';
import Exercise from '../scripts/Exercise';
import { GoogleButton } from '../scripts/GoogleLogin';


export default function Content() {
    
    return(
        <div>
            <LandingPage />
            <HomePage />
            <GoogleButton />
            <UserProfile />
            <AddGoal />
        </div>
    );
}
