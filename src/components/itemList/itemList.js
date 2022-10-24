import React, { Component } from "react";
import Spinner from "../spinner";
import GotService from "../../services/gotService";

import "./itemList.css";

export default class ItemList extends Component {
  gotService = new GotService();
  // инициализируем стейт с пустыми персами
  state = {
    charListFormState: null,
  };

  // получаем персов через GotService и записываем их в стейт
  componentDidMount() {
    const { getData } = this.props;

    getData().then((charListFromBase) => {
      this.setState({ charListFormState: charListFromBase });
    });
  }

  // рендерим элементы li на основании массива объектов с персами, который получили из
  // GotService, но используем этот метод при рендеринге,
  // задаем аргументом наш массив с объектами (персами) из стейта
  renderItems(arr) {
    // обязательно в аргументах при map задаем сам элемент и его номер по порядку,
    // т.к. react должен будет понимать, какой уникальный номер у каждого элемента
    // и использовать это для последующих обработчиков событий, по типу клика
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      // в key элемента li записываем id персонажа из базы, отрезаем всю строку
      // со свойства url, и оставляем лишь номер персонажа в базе
      // т.к. мы находимся на 5ой странице - номера идут от 41 до 50
      return (
        <li
          key={id}
          className="list-group-item"
          // приходит из пропсов в компоненте App, для передачи номера элемента
          // необходимо указывать как стрелочную функцию
          // 41 + i т.к. у нас 5ая страница в базе, где у персонажей есть хоть
          // какие-то данные
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    // получаем наш массив с объектами (персами) из стейта
    const { charListFormState } = this.state;

    // если массив пуст - показываем спиннер
    if (!charListFormState) {
      return <Spinner />;
    }

    // если массив не пуст, прогоняем его через функицю renderItems, которая
    // возвращает нам верстку с элементами li, в которых имена наших персов
    const items = this.renderItems(charListFormState);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
