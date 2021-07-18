import React, {Component} from 'react';
import ItemDetails, {Field} from '../itemDetails';
import GotService from '../../services/GotService';

export default class BooksItem extends Component {
  gotService = new GotService();

  render() {
    const {booksId} = this.props;
    
    return (
      <ItemDetails
        itemId={booksId}
        getData={this.gotService.getBook}>
          <Field field={'numberOfPages'} label={'NumberOfPages'}/>
          <Field field={'publiser'} label={'Publiser'}/>
          <Field field={'released'} label={'Released'}/>
      </ItemDetails>
    )
  }
}