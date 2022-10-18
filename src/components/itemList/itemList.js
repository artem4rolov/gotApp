import React, { Component } from "react";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import "./itemList.css";

export default class ItemList extends Component {
  got = new GotService();

  // инициализируем стейт с пустыми персами
  state = {
    charList: null,
  };

  // получаем персов через GotService и записываем их в стейт
  componentDidMount() {
    this.got.getAllCharacters().then((charListFromBase) => {
      this.setState({ charList: charListFromBase });
    });
  }

  // рендерим элементы li на основании массива объектов с персами, который получили из
  // GotService, но используем этот метод при рендеринге,
  // задаем аргументом наш массив с объектами (персами) из стейта
  renderItems(arr) {
    // обязательно в аргументах при map задаем сам элемент и его номер по порядку,
    // т.к. react должен будет понимать, какой уникальный номер у каждого элемента
    // и использовать это для последующих обработчиков событий, по типу клика
    return arr.map((item, i) => {
      return (
        <li
          key={i}
          className="list-group-item"
          // приходит из пропсов в компоненте App, для передачи номера элемента
          // необходимо указывать как стрелочную функцию
          onClick={() => this.props.onCharSelected(41 + i)}
        >
          {item.name}
        </li>
      );
    });
  }

  render() {
    // получаем наш массив с объектами (персами) из стейта
    const { charList } = this.state;

    // если массив пуст - показываем спиннер
    if (!charList) {
      return <Spinner />;
    }

    // если массив не пуст, прогоняем его через функицю renderItems, которая
    // возвращает нам верстку с элементами li, в которых имена наших персов
    const items = this.renderItems(charList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
