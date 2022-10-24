import React from "react";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class BooksPage extends React.Component {
  gotService = new GotService();

  state = {
    selectedBook: 1,
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  // принимаем id кликнутого элемента (персонажа из списка в компоненте itemList)
  // и записываем в стейт для того, чтобы передать этот id в компонент itemDetails,
  // где выведем подробную инфу о выбранной книге из списка
  onItemSelected = (id) => {
    this.setState({ selectedBook: id });
  };

  render() {
    // выносим наши компоненты itemList и itemDetails в отдельные переменные,
    // чтобы не копировать трижды этот код, а менять всё что нужно в одном месте
    if (this.state.error) {
      return <ErrorMessage />;
    }

    // компонент itemList
    const itemList = (
      // принимаем id кликнутого элемента в списке книг (onItemSelected)
      // передаем getData для передачи конкретной функции в пропсы (получение персонажей ИЛИ книг ИЛИ домов)
      // передаем renderItem, чтобы задать то, что мы хотим видеть в каждом элементе при рендере (имя, пол, можно любое свойство из объекта item (наш персонаж ИЛИ книга ИЛИ дом))
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={(item) => item.name}
      />
    );

    // компонент itemDetails
    const itemDetails = (
      // передаем id из state в компонент itemDetails
      // передаем getData для передачи конкретной функции в пропсы (получение персонажей ИЛИ книг ИЛИ домов)
      <ItemDetails
        charId={this.state.selectedBook}
        getData={this.gotService.getBook}
      >
        {/* поля, которые будут отображаться при клике на книгу */}
        {/* field - значение из БД, label - надпись напротив значения из БД */}
        <Field field="numberOfPages" label="Number of Pages" />
        <Field field="publiser" label="Publiser" />
        <Field field="released" label="Released" />
      </ItemDetails>
    );

    // компонент RowBlock также вынесли в отдельный файл, чтобы менять всё в одном месте
    return <RowBlock left={itemList} right={itemDetails} />;
  }
}
