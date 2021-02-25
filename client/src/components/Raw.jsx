import React, { useState } from 'react';
import styled from 'styled-components';

const RawWrapper = styled.div`
  margin-top: 12px;
  text-align: center;
`;

const RawData = styled.div`
  background-color: white;
  border: 1px solid black;
  max-height: 50vh;
  overflow: auto;
  white-space: pre-wrap;
  display: inline-block;
`;

const Raw = ({ rawData }) => {
  const [showingRaw, toggleShowingRaw] = useState(false);

  return (
    <RawWrapper>
      <button onClick={() => toggleShowingRaw(!showingRaw)}>
        Toggle Raw Data View
      </button>
      {showingRaw && <RawData>{JSON.stringify(rawData, null, 2)}</RawData>}
    </RawWrapper>
  );
};

export default Raw;
