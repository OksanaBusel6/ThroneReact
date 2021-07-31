import React, {useState} from 'react';
import styled from 'styled-components';


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


function ItemList({id, changed, onItemSelected, renderItem, data}) {
  const [index, changeId] = useState(id);

  function onChangeItem(id) {
    onItemSelected(id);

    if (changed) {
      changeId(() => id);
    }
  }

  function renderItems(arr) {
    return arr.map((item) => {
      const {id} = item;
      const clazz = id === index ? 'active list-item' : 'list-item';
      const label = renderItem(item);

      return (
        <li
          key={id}
          className={clazz}
          onClick={() => onChangeItem(id)}>
          {label}
        </li>
      )
    });
  }
  
  const items = renderItems(data);

  return (
    <ListGroup className="list-group">
      {items}
    </ListGroup>
  );
}

export default ItemList;
