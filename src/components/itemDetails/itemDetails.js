import React, {Component} from 'react';
import styled from 'styled-components';
import {Term} from '../randomChar/randomChar';
import GotService from '../../services/GotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const DetailsWrap = styled.div `
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  border-radius: 0.25rem;
`;

const DetailsTitle = styled.h4`
  margin-bottom: 20px;
  text-align: center;
`;

const Field = ({item, field, label}) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <Term>{label}</Term>
      <span>{item[field]}</span>
    </li>
  );
};

export {Field};

export default class ItemDetails extends Component {
  constructor(props) {
    super(props);
  }

  gotService = new GotService();

  state = {
    item: null,
    error: false,
    loader: true
  };

  updateItem = () => {
    const {itemId, getData} = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId)
        .then((item) => {
          this.setState({
            item,
            loader: false
          });
        })
        .catch(() => {
          this.onError();
        });

  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId) {
       this.updateItem();
    }
  }

  onError() {
    this.setState({
      error: true,
      loader: false
    });
  }

  render() {
    const {error, item, loader} = this.state;

    if(error) {
      return <ErrorMessage/>;
    }

    if (loader) {
      return <Spinner/>;
    }

    const {name} = item;

    return (
      <DetailsWrap>
        <DetailsTitle>{name}</DetailsTitle>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, {item});
            })
          }
        </ul>
      </DetailsWrap>
    );
  }
}