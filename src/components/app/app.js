import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import styled from 'styled-components';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BooksPage, HousesPage, BooksItem, ErrorPage, HomePage} from '../pages';
import ErrorMessage from '../errorMessage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import got from './got.jpeg';

const ButtonToggle = styled.button`
  border-radius: 0.25rem;
  border: none;
  coursor: pointer;
  width: 100%;
  padding: 10px;
  background-color: #658392;
  margin-bottom: 40px;
`;

const AppContainer = styled.div`
  background: blue url(${got}) center center no-repeat;
  background-size: cover;
  height: 100%;
  min-height: 100vh;
  padding-bottom: 160px;
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
      <Router>
        <AppContainer>
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
            <Switch>
              <Route path="/" exact component={HomePage}/>
              <Route path="/characters" component={CharacterPage}/>
              <Route path="/houses" component={HousesPage}/>
              <Route path="/books" exact component={BooksPage}/>
              <Route path="/books/:id" render={
                ({match}) => {
                  const {params: {id}} = match;
                  return <BooksItem booksId={id}/>
                }
              }/>
              <Route component={ErrorPage}/>
            </Switch>
          </Container>
        </AppContainer>
      </Router>
    );
  }
}
