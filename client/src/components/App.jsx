import React, { useState } from 'react';
import styled from 'styled-components';

import Header from './Header.jsx';
import Body from './Body.jsx';

const AppWrapper = styled.div`

`;

const App = () => {
  // state that determines which 'tab' is in use
  const [display, setDisplay] = useState('total');

  return (
    <AppWrapper>
      <Header setDisplay={setDisplay} />
      <Body display={display}/>
    </AppWrapper>
  )
}

export default App;

