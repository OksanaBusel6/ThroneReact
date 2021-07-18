import React, {Component} from 'react';
import RowBlock from '../rowBlock';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/GotService';

export default class HousesPage extends Component {
  constructor(props) {
    super(props);
  }

  gotService = new GotService();

  state = {
    selectedHouse: 1,
    error: false
  };

  onHouseSelected = (id) => {
    this.setState({
      selectedHouse: id
    });
  };

  render() {
    const {selectedHouse, error} = this.state;

    if (error) {
      return <ErrorMessage/>;
    }

    const itemList = (
      <ItemList
        getData={this.gotService.getAllHouses}
        onItemSelected={this.onHouseSelected}
        renderItem={(item) => item.name}/>
    );

    const itemDetails = (
      <ItemDetails
        getData={this.gotService.getHouse}
        itemId={selectedHouse}>
          <Field field={'region'} label={'Region'}/>
          <Field field={'words'} label={'Words'}/>
          <Field field={'titles'} label={'Titles'}/>
          <Field field={'overlord'} label={'Overlord'}/>
          <Field field={'ancestralWeapons'} label={'Ancestral Weapons'}/>
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={itemDetails}/>
    );
  }
}