import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/GotService';
import {withRouter} from 'react-router-dom';

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

    return (
      <ItemList
        onItemSelected={(booksId) => {
          this.props.history.push(booksId)
        }}
        renderItem={(item) => item.name}
        getData={this.gotService.getAllBooks}
        />
    );
  }
}

export default withRouter(BooksPage);