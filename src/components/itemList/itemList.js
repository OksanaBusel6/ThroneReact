import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/GotService';
import Spinner from '../spinner';

const ListGroup = styled.ul`
  .list-group-item {
    cursor: pointer;
  }
`;

export default class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  gotService = new GotService();

  state = {
    charList: null
  }

  componentDidMount() {
    this.gotService.getAllCaracters()
        .then((charList) => {
          this.setState({charList});
        });
  }

  renderItems(arr) {
    return arr.map(item => {
      const {name, id} = item;
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.props.onCharSelected(id)}>
          {name}
        </li>
      )
    });
  }

  render() {
    const {charList} = this.state;

    
    if (!charList) {
      return <Spinner/>
    }
    
    const items = this.renderItems(charList);

    return (
      <ListGroup className="list-group">
        {items}
      </ListGroup>
    )
  }
}
