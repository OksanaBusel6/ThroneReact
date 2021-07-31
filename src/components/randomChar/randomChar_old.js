import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/GotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

const RandomBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  border-radius: 0.25rem;
  overflow: hidden;

  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

export const Term = styled.span`
  font-weight: bold;
  margin-right: 30px;
`;

export default class RandomChar extends Component {

  gotService = new GotService();

  state = {
    char: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    const {interval} = this.props;

    this.updateChar();
    this.timerId = setInterval(this.updateChar, interval);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    });
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updateChar = () => {
    const id = Math.floor(Math.random() * 140 + 25);
    this.gotService.getCharecter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }
  
  render() {
    const {char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
      <RandomBlock>
        {errorMessage}
        {spinner}
        {content}
      </RandomBlock>
    )
  }
}

RandomChar.defaultProps = {
  interval: 15000
}

RandomChar.propTypes = {
  interval: PropTypes.number
}

const View = ({char}) => {
  const {name, gender, born, died, culture} = char;

  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <Term>Gender </Term>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Born </Term>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Died </Term>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Culture </Term>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  )
}

