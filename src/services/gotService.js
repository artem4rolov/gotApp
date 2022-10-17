export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  async getResouce(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  async getAllCharacters() {
    const res = await this.getResouce(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter);
  }

  async getCharacter(id) {
    const character = await this.getResouce(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  getAllHomes() {
    return this.getResouce(`/houses?page=5&pageSize=10`);
  }

  getHome(id) {
    return this.getResouce(`/houses/${id}`);
  }

  getAllBooks() {
    return this.getResouce(`/books?page=5&pageSize=10`);
  }

  getBook(id) {
    return this.getResouce(`/books/${id}`);
  }

  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.name,
      born: char.name,
      died: char.died,
      culture: char.culture,
    };
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released,
    };
  }
}
