import React, {Component} from 'react';
//import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/GotService';
import {withRouter} from 'react-router-dom';
import ItemList from '../itemList';
import widthData from '../widthData';

class BooksPage extends Component {
  constructor(props) {
    super(props);
  }

  gotService = new GotService();

  state = {
    error: false
  };

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  render () {
    const {error} = this.state;

    if (error) {
      return <ErrorMessage/>;
    }

    const BooksPage = widthData(ItemList, this.gotService.getAllBooks);

    return (
      <BooksPage
        onItemSelected={(booksId) => {
          this.props.history.push(booksId)
        }}
        renderItem={(item) => item.name}/>
    );
  }
}

export default withRouter(BooksPage);