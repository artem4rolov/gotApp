export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  // getResourse

  getResouce = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  // characters

  getAllCharacters = async () => {
    const characters = await this.getResouce(`/characters?page=5&pageSize=10`);
    return characters.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const character = await this.getResouce(`/characters/${id}`);
    return this._transformCharacter(character);
  };

  // houses

  getAllHouses = async () => {
    const houses = await this.getResouce(`/houses/`);
    return houses.map(this._transformHouse);
  };

  getHouse = async (id) => {
    const house = await this.getResouce(`/houses/${id}`);
    return this._transformHouse(house);
  };

  // books

  getAllBooks = async () => {
    const books = await this.getResouce(`/books/`);
    return books.map(this._transformBook);
  };

  getBook = async (id) => {
    const book = await this.getResouce(`/books/${id}`);
    return this._transformBook(book);
  };

  // достаем последние цифры id из url каждого item, чтобы использовать этот id
  // для рендера элементов списка ul в компоненте itemList
  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  };

  isSet = (data) => {
    if (data) {
      return data;
    } else {
      return "no data :(";
    }
  };

  _transformCharacter = (char) => {
    return {
      id: this._extractId(char),
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture),
      // url: char.url,
    };
  };

  _transformHouse = (house) => {
    return {
      id: this._extractId(house),
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(house.titles),
      overlord: this.isSet(house.overlord),
      ancestralWeapons: this.isSet(house.ancestralWeapons),
    };
  };

  _transformBook = (book) => {
    return {
      id: this._extractId(book),
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publiser: this.isSet(book.publiser),
      released: this.isSet(book.released),
    };
  };
}
