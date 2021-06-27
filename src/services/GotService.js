export default class GotService {

  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  async getResourse(url){
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Error status: ${res.status}`);
    }

    return await res.json();
  }

  async getAllBooks() {
    const res = await this.getResourse('/books');
    return res.map(this._transformBooks);
  }

  async getBook(id) {
    const book = await this.getResourse(`/books/${id}`);
    return this._transformBooks(book);
  }

  async getAllCaracters() {
    const res = await this.getResourse('/characters?page=5&pageSize=10');
    return res.map(this._transformChsracter);
  }
  async getCharecter(id) {
    const character = await this.getResourse(`/characters/${id}`);
    return this._transformChsracter(character);
  }

  async getAllHouses() {
    const res = await this.getResourse('/houses');
    return res.map(this._transformHouse);
  }

  async getHouses(id) {
    const house = await this.getResourse(`/houses/${id}`);
    return this._transformHouse(house);
  }

  isSet(data) {
    if (data) {
      return data;
    } else {
      return 'no data :(';
    }
  }

  _transformChsracter(char) {
    return {
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture)
    };
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    };
  }

  _transformBooks(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released
    };
  }
}