import React from 'react';
import styled from 'styled-components';
import { RobotIcon } from '../../icons';

// Define the styled component outside the function
const Wrapper = styled.div`
  padding: 10px
  width: 80%;
  height: 256px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  gap: 20px;
  margin: 0 auto; 
`;

const TextWrapper = styled.div`
  padding: 10px
  margin-top: 10px;
  width: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  gap: 5px;
  margin: 0 auto; 
`;

export default function Robot(): JSX.Element {
  return (
    <Wrapper>
      <RobotIcon />
    </Wrapper>
  );
}
