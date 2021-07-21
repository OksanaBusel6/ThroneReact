import React, {Component} from 'react';
//import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/GotService';
import RowBlock from '../rowBlock';
import ItemList from '../itemList';
import widthData from '../widthData';

export default class CharacterPage extends Component {

  gotService = new GotService();

  state = {
    selectedChar: '61',
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

    const CharacterList = widthData(ItemList, this.gotService.getAllCharacters);

    const characterList = (
      <CharacterList
        onItemSelected={this.onCharSelected}
        renderItem={({name, gender}) => `${name} (${gender})`}
        changed
        id={this.state.selectedChar}/>
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
        <RowBlock left={characterList} right={itemDetails}/>
    );
  }
}
