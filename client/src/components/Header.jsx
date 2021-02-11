import React, { useState } from 'react';

const Header = ( { setDisplay } ) => {

  const h2Style = {
    border: '1px solid black',
    borderRadius: '50px',
    padding: '4px',
    cursor: 'pointer',
  }

  return (
    <header style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto', backgroundColor: 'lightgray'}}>
      <h2 style={h2Style} onClick={() => setDisplay('total')}>Total Playtime</h2>
      <h2 style={h2Style} onClick={() => setDisplay('individual')}>Individual Playtimes</h2>
      <h2 style={h2Style} onClick={() => setDisplay('about')}>About</h2>
    </header>
  )
}

export default Header;