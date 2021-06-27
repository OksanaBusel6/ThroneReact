import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import styled from 'styled-components';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import PersonDetails from '../personDetails';
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
    selectedChar: null,
    error: false
  }

  onToggleBlock = () => {
    this.setState((state) => {
      return {
        randomChar: !state.randomChar
      }
    });
  };

  onCharSelected = (id) => {
    console.log(id);
    this.setState({
      selectedChar: id
    });
  };

  render() {
    const {randomChar, erorr} = this.state;

    if (erorr) {
      return <ErrorMessage/>
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
          <Row>
            <Col md='6'>
              <ItemList onCharSelected={this.onCharSelected}/>
            </Col>
            <Col md='6'>
              <PersonDetails charId={this.state.selectedChar}/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
