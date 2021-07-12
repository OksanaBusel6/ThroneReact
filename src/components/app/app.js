import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import styled from 'styled-components';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage';
import BooksPage from '../pages/booksPage';
import HousesPage from '../pages/housesPage';
import ErrorMessage from '../errorMessage';

const ButtonToggle = styled.button`
  border-radius: 0.25rem;
  border: none;
  coursor: pointer;
  width: 100%;
  padding: 10px;
  background-color: #658392;
  margin-bottom: 40px;
`;


export default class App extends Component {

  state = {
    randomChar: true,
    error: false
  };

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  onToggleBlock = () => {
    this.setState((state) => {
      return {
        randomChar: !state.randomChar
      };
    });
  };

  render() {
    const {randomChar, error} = this.state;

    if (error) {
      return <ErrorMessage/>;
    }

    const randomBlock = randomChar ? <RandomChar/> : null;

    return (
      <>
        <Container>
          <Header/>
        </Container>
        <Container>
          <Row>
            <Col lg={{size: 5, offset: 0}}>
              {randomBlock}
              <ButtonToggle onClick={this.onToggleBlock}>Toggle Random Char</ButtonToggle>
            </Col>
          </Row>
          <CharacterPage/>
          <BooksPage/>
          <HousesPage/>
        </Container>
      </>
    );
  }
}
