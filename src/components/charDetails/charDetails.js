import React, { Component } from "react";
import GotService from "../../services/gotService";
import "./charDetails.css";

export default class CharDetails extends Component {
  got = new GotService();

  state = {
    char: null,
  };

  // при монтировании компонента, получаем перса из метода updateChar
  componentDidMount() {
    this.updateChar();
  }

  // при клике на другого персонажа в компоненте itemList, мы принимаем новый id
  // и только в этом случае сработает хук componentDidUpdate
  // в этот хук обязательно нужно передавать предыдущий props - prevProps
  componentDidUpdate(prevProps) {
    // компонент charDetails будет обновлен только в том случае, если предыдущий props (id)
    // из компонента App и текущий (новый кликнутый элемент) id не будут равны
    // (т.е. действительно произошел клик на другого персонажа из списка компонента itemList
    // и мы получили новый id)
    if (this.props.charId !== prevProps.charId) {
      // только в этом случае мы обновляем инфу о персонаже
      this.updateChar();
    }
  }

  // метод получает персонажа из базы GameOfThrones
  updateChar() {
    // принимаем id из пропсов в компоненте App
    const { charId } = this.props;
    if (!charId) {
      // если вдруг ничего не пришло - ничего не делаем
      return;
    }

    // если получили айди из props, подключаемся к базе и получаем перса по id
    // и записываем в state
    this.got.getCharacter(charId).then((charFromBase) => {
      this.setState({ char: charFromBase });
    });
    // код ниже - для ошибки в компоненте, пример использования
    // хука componentDidCatch
    this.foo.bar = 1;
  }

  render() {
    // если вдруг state с персонажем пуст - выводим сообщение
    if (!this.state.char) {
      return <span className="select-error">Please select a character</span>;
    }

    // деструктурируем объект из state и достааем переменные для верстки
    const { name, gender, born, died, culture } = this.state.char;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Born</span>
            <span>{born}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Died</span>
            <span>{died}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Culture</span>
            <span>{culture}</span>
          </li>
        </ul>
      </div>
    );
  }
}
