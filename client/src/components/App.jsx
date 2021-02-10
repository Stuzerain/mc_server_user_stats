import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './Header.jsx';
import Body from './Body.jsx';

import ChartView from './ChartView.jsx';
import TableView from './TableView.jsx';
import DateSearch from './DateSearch.jsx';



const App = () => {
  const [display, setDisplay] = useState('');

  return (
    <div>
      <Header setDisplay={setDisplay} />
      <Body display={display}/>
    </div>
  )
}

export default App;