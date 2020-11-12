import React, { useState, useEffect } from 'react';
import { clientSocket } from './Socket';

export default function Work() {
  return (
    <div>
      <h1>Work News Feed</h1>
      <p>List of goals only dealing with work</p>
    </div>
  );
}
