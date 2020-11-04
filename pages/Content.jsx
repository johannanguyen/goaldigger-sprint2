import * as React from 'react';
import LandingPage from './LandingPage';
import HomePage from  './HomePage';
import UserProfile from './UserProfile';

export default function Content() {
    
    return(
        <div>
            <LandingPage />
            <HomePage />
            <UserProfile />
        </div>
    );
}
