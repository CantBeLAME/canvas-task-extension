import React from 'react';
import styled from 'styled-components';
import { RobotIcon } from '../../icons';
import Button from '../task-form/components/Button';

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

export default function Robot(): JSX.Element {
  return (
    <Wrapper>
      <Button
        label={'See Stats'}
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
        color={''}
      />
    </Wrapper>
  );
}
