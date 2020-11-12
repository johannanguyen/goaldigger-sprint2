import React, { useState, useEffect } from 'react';
import { clientSocket } from './Socket';

export default function Misc() {
  return (
    <div>
      <h1>Miscellaneous News Feed</h1>
      <p>Goals that do not fall into other categories</p>
    </div>
  );
}
