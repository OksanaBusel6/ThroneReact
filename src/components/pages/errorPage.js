import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import errorImg from './errorImg.jpg';

const ErrorContainer = styled.div`
  width: 100%;

  a {
    width: 200px;
    border: 2px solid blue;
    font-size: 20px;
    padding: 15px;
    transition: all .3s;
    display: block;
    margin: 0 auto;
    color: #fff;
    font-weight: 700;
  }

  a:hover {
    background-color: #fff;
    color: blue;
  }
`;

const ImgWrap = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ImgWrap>
        <img src={errorImg}/>
      </ImgWrap>
      <Link to="/" className="btn btn-primary">Home</Link>
    </ErrorContainer>
  )
};

export default ErrorPage;