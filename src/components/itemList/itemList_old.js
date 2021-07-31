import React, {Component} from 'react';
import styled from 'styled-components';
//import PropTypes from 'prop-types';
//import GotService from '../../services/GotService';
//import widthData from './../widthData';


const ListGroup = styled.ul`
  border-radius: 0.25rem;
  background-color: #fff;
  overflow: hidden;

  .list-item {
    position: relative;
    display: block;
    padding: 0.5rem 1rem;
    color: #212529;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    cursor: pointer;
    transition: all .3s;
  }
  .list-item.active,
  .list-item:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;


export default class ItemList extends Component {

  state = {
    id: this.props.id
  }

  onChangeItem = (id) => {
    const {changed} = this.props;
    const {onItemSelected} = this.props;

    onItemSelected(id);

    if (changed) {
      this.setState({id});
    }

  }

  renderItems(arr) {
    return arr.map((item) => {
      const {id} = item;
      const clazz = id === this.state.id ? 'active list-item' : 'list-item';
      const label = this.props.renderItem(item);

      return (
        <li
          key={id}
          className={clazz}
          onClick={() => this.onChangeItem(id)}>
          {label}
        </li>
      )
    });
  }
  
  render() {
    const {data} = this.props;
    const items = this.renderItems(data);
  
    return (
      <ListGroup className="list-group">
        {items}
      </ListGroup>
    );
  }
}
/* 
ItemList.defaultProps = {
  onItemSelected: () => {}
}

ItemList.propTypes = {
  onItemSelected: PropTypes.func,
  //getData: PropTypes.arrayOf(PropTypes.object)
}
 */


//const {getAllCharacters} = new GotService();
