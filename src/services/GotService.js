export default class GotService {

  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  async getResource (url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Error status: ${res.status}`);
    }

    return await res.json();
  }

  getAllBooks = async () => {
    const res = await this.getResource('/books');
    return res.map((item) => {
      return this._transformBooks(item);
    });
  }

  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBooks(book);
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`/characters?page=7&pageSize=10`);
    
    return res.map((item) => {
      return this._transformCharacter(item);
    });
  }

  
  getCharecter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  getAllHouses = async () => {
    const res = await this.getResource('/houses?page=7&pageSize=10');
    return res.map((item) => this._transformHouse(item));
  }

  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformHouse(house);
  }

  isSet(...data) {

    const arr = Array.from(data).map(item => {
      if (item) {
        return item;
      } else {
        return 'no data :(';
      }
    });

    return arr.join(', ');
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
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(...house.titles),
      overlord: this.isSet(house.overlord),
      ancestralWeapons: this.isSet(...house.ancestralWeapons),
      id: house.url.replace(this._apiBase + '/houses/', '')
    };
  }

  _transformBooks(book) {
    return {
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publiser: this.isSet(book.publiser),
      released: this.isSet(book.released),
      id: book.url.replace(this._apiBase + '/books/', '')
    };
  }
}