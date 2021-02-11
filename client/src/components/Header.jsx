import React from 'react';
import styled from 'styled-components';

const Heading = styled.header`
  display: flex;
  justify-content: space-around;
  margin: auto;
  background-color: lightgray;
`;

const HeadItem = styled.h2`
  border: 1px solid black;
  border-radius: 50px;
  padding: 4px;
  cursor: pointer;
`;

const Header = ( { setDisplay } ) => {
  return (
    <Heading>
      <HeadItem onClick={() => setDisplay('total')}>Total Playtime</HeadItem>
      <HeadItem onClick={() => setDisplay('individual')}>Individual Playtimes</HeadItem>
      <HeadItem onClick={() => setDisplay('about')}>About</HeadItem>
    </Heading>
  )
}

export default Header;