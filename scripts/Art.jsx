import React, { useState, useEffect } from 'react';
import { clientSocket } from './Socket';

export default function Art() {
  return (
    <div>
      <h1>Art News Feed</h1>
      <p>List of goals only dealing with art</p>
    </div>
  );
}
