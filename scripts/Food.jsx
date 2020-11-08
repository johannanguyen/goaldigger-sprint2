import React, { useState, useEffect } from 'react';
import { clientSocket } from './Socket';

export default function Food() {
    
    return(
        <div>
            <h1>Food News Feed</h1>
            <p>List of goals only dealing with food</p>
        </div>
    );
}