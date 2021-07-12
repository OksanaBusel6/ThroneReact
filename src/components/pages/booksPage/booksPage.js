import React, {Component} from 'react';
import RowBlock from '../../rowBlock';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/GotService';

export default class BooksPage extends Component {
  constructor(props) {
    super(props);
  }

  gotService = new GotService();

  state = {
    selectedBook: 1,
    error: false
  };

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  onBookSelected = (id) => {
    this.setState({
      selectedBook: id
    });
  };

  render () {
    const {error, selectedBook} = this.state;

    if (error) {
      return <ErrorMessage/>;
    }

    const itemList =  (
      <ItemList
        onItemSelected={this.onBookSelected}
        renderItem={(item) => item.name}
        getData={this.gotService.getAllBooks}
        />
    );

    const itemDetails = (
      <ItemDetails
        itemId={selectedBook}
        getData={this.gotService.getBook}>
          <Field field={'numberOfPages'} label={'NumberOfPages'}/>
          <Field field={'publiser'} label={'Publiser'}/>
          <Field field={'released'} label={'Released'}/>
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={itemDetails}/>
    );
  }
}