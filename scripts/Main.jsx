import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HomePage from '../pages/HomePage';
import Content from '../pages/Content';


ReactDOM.render(<Content/>, document.getElementById('content2'));
ReactDOM.render(<HomePage/>, document.getElementById('content'));
