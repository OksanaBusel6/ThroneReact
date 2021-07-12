import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

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
  }
  .list-item.active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;


export default class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    itemList: null,
    index: 0,
    loader: true,
    error: false
  };

  componentDidMount() {
    const {getData} = this.props;
    getData()
        .then((itemList) => {
          this.setState({
            itemList,
            loader: false
          });
          const {id} = this.state.itemList[0];
          this.props.onItemSelected(id);
        })
        .catch(() => {
          this.onError();
        });
  }

  onError() {
    this.setState({
      error: true,
      loader: false
    })
  }

  onClickItem = (index, id) => {
    this.props.onItemSelected(id);
    this.setState({index});
  };

  renderItems(arr) {
    return arr.map((item, index) => {
      const {id} = item;
      const clazz = index === this.state.index ? 'active list-item' : 'list-item';
      const label = this.props.renderItem(item);
      return (
        <li
          key={id}
          className={clazz}
          onClick={() => this.onClickItem(index, id)}>
          {label}
        </li>
      )
    });
  }

  render() {
    const {itemList, error, loader} = this.state;

    if (error) {
      return <ErrorMessage/>
    }
    
    if (loader) {
      return <Spinner/>
    }
    
    const items = this.renderItems(itemList);

    return (
      <ListGroup className="list-group">
        {items}
      </ListGroup>
    )
  }
}
