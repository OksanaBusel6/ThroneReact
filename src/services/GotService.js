export default class GotService {

  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  async getResource(url){
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Error status: ${res.status}`);
    }

    return await res.json();
  }

  async getAllBooks() {
    const res = await this.getResource('/books');
    return res.map(this._transformBooks);
  }

  async getBook(id) {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBooks(book);
  }

  async getAllCaracters() {
    const res = await this.getResource(`/characters?page=7&pageSize=10`);
    
    return res.map((item) => {
      return this._transformCharacter(item);
    });
  }

  
  async getCharecter(id) {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  async getAllHouses() {
    const res = await this.getResource('/houses');
    return res.map(this._transformHouse);
  }

  async getHouses(id) {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformHouse(house);
  }

  isSet(data) {
    if (data) {
      return data;
    } else {
      return 'no data :(';
    }
  }

  _transformCharacter(char) {
    return {
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture),
      id: char.url.replace(this._apiBase + '/characters/', '')
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