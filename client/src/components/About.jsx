import React from 'react';
import styled from 'styled-components';

const AboutWrapper = styled.div`
  margin: auto;
  background-color: white;
  text-align: center;
  max-width: 50%;
  padding: 4px;
`;

const About = () => {

  return (
    <AboutWrapper>
      This application is intended to be lightweight and not require direct access to server log files, help from server admins, etc. Given a server's IP address, it will query the server every 5 minutes. If any players are online, it will create database entry with their name. After that, any time that player is online in further queries, it will add 5 minutes to their total playtime total, as well as the subtotal for that day. This is based on the assumption that when a player is online, they are likely to be online for more than 5 minutes. As a result, the data that this application collects is an estimate. This is part of the compromise between collecting data and remaining lightweight/not requiring any special permissions.
    </AboutWrapper>
  )
}

export default About;