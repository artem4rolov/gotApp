import React from "react";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";

export default class BooksPage extends React.Component {
  gotService = new GotService();

  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    // выносим наши компоненты itemList и itemDetails в отдельные переменные,
    // чтобы не копировать трижды этот код, а менять всё что нужно в одном месте
    if (this.state.error) {
      return <ErrorMessage />;
    }

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
    return (
      // принимаем id кликнутого элемента в списке книг (onItemSelected)
      // передаем getData для передачи конкретной функции в пропсы (получение персонажей ИЛИ книг ИЛИ домов)
      // передаем renderItem, чтобы задать то, что мы хотим видеть в каждом элементе при рендере (имя, пол, можно любое свойство из объекта item (наш персонаж ИЛИ книга ИЛИ дом))
      <ItemList
        onItemSelected={(itemId) => {
          this.props.history.push(`/books/${itemId}`);
        }}
        getData={this.gotService.getAllBooks}
        renderItem={(item) => item.name}
      />
    );
  }
}
