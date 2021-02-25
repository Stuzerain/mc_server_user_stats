import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Mods from './Mods.jsx';
import Raw from './Raw.jsx';
// const { getRawData } = require('../utilities/APIfunctions.js');

const AboutWrapper = styled.div`
  margin: auto;
  text-align: center;
  max-width: 50%;
  padding: 4px;
`;

const AboutChild = styled.div`
  margin: 12px;
  padding: 2px;
  background-color: white;
  border: 1px solid black;
  display: inline-block;
`;

const About = ({ rawData }) => {
  const showMods = () => {
    if (rawData.online) {
      return <Mods mods={rawData.mods} />;
    }

    return <AboutChild>The server is currently offline</AboutChild>;
  };

  return (
    <AboutWrapper>
      <AboutChild>
        This application is intended to be lightweight and not require direct
        access to server log files, help from server admins, etc. Given a
        server's IP address, it will query the server every 5 minutes. If any
        players are online, it will create database entry with their name. After
        that, any time that player is online in further queries, it will add 5
        minutes to their total playtime total, as well as the subtotal for that
        day. This is based on the assumption that when a player is online, they
        are likely to be online for more than 5 minutes. As a result, the data
        that this application collects is an estimate. This is part of the
        compromise between collecting data and remaining lightweight/not
        requiring any special permissions.
      </AboutChild>
      {showMods()}
      <Raw rawData={rawData} />
    </AboutWrapper>
  );
};

export default About;
