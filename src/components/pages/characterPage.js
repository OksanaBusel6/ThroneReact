import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/GotService';
import RowBlock from '../rowBlock';



export default class CharacterPage extends Component {

  gotService = new GotService();

  state = {
    selectedChar: 67,
    error: false
  };

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id
    });
  };

  render() {
    const {selectedChar, error} = this.state;

    if (error) {
      return <ErrorMessage/>;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onCharSelected}
        getData={this.gotService.getAllCharacters}
        renderItem={({name, gender}) => `${name} (${gender})`}/>
    );

    const itemDetails = (
      <ItemDetails
        itemId={selectedChar}
        getData={this.gotService.getCharecter}>
        <Field field={'gender'} label={'Gender'}/>
        <Field field={'born'} label={'Born'}/>
        <Field field={'died'} label={'Died'}/>
        <Field field={'culture'} label={'Culture'}/>
      </ItemDetails>
    );

    return (
        <RowBlock left={itemList} right={itemDetails}/>
    );
  }
}