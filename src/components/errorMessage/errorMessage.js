import React from 'react';
import styled from 'styled-components';
import img from './error.jpg';

const ErrorBlock = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  img {
    width: 100%;
    display: block;
    margin-bottom: 10px;
  }
`;

const ErrorMessage = () => {
  return (
    <ErrorBlock>
      <img src={img} alt='error'></img>
      <span>Something goes wrong</span>
    </ErrorBlock>
  );
};
export default ErrorMessage;