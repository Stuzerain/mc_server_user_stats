import React, { useState } from 'react';
import styled from 'styled-components';

import Header from './Header.jsx';
import Body from './Body.jsx';

const AppWrapper = styled.div`
/* background-image: url(dirtTransition.jpg); */
`;

const App = () => {
  const [display, setDisplay] = useState('total');

  return (
    <AppWrapper>
      <Header setDisplay={setDisplay} />
      <Body display={display}/>
    </AppWrapper>
  )
}

export default App;

