import React, { Component } from "react";
import GotService from "../../services/gotService";
import "./itemDetails.css";

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Field };

export default class ItemDetails extends Component {
  got = new GotService();

  state = {
    item: null,
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
    const { charId, getData } = this.props;
    if (!charId) {
      // если вдруг ничего не пришло - ничего не делаем
      return;
    }

    // если получили айди из props, подключаемся к базе и получаем перса по id
    // и записываем в state
    getData(charId).then((itemFromBase) => {
      this.setState({ item: itemFromBase });
    });
    // код ниже - для ошибки в компоненте, пример использования
    // хука componentDidCatch
    // this.foo.bar = 1;
  }

  render() {
    // если вдруг state с персонажем пуст - выводим сообщение
    if (!this.state.item) {
      return <span className="select-error">Please select element</span>;
    }

    const { item } = this.state;
    const { name } = item;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {/* при клике на какой-либо элемент из списка, мы делаем копии каждого Field
          (свойство объекта) из пропсов, а значения этих свойств берем из конкретного
          item, на который кликнули (персонаж, книга, дом) */}
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    );
  }
}
