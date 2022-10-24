import React from "react";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class CharactersPage extends React.Component {
  gotService = new GotService();

  state = {
    selectedChar: 130,
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  // принимаем id кликнутого элемента (персонажа из списка в компоненте itemList)
  // и записываем в стейт для того, чтобы передать этот id в компонент charDetails,
  // где выведем подробную инфу о выбранном персонаже из списка
  onItemSelected = (id) => {
    this.setState({ selectedChar: id });
  };

  render() {
    // выносим наши компоненты itemList и charDetails в отдельные переменные,
    // чтобы не копировать трижды этот код, а менять всё что нужно в одном месте
    if (this.state.error) {
      return <ErrorMessage />;
    }

    // компонент itemList
    const itemList = (
      // принимаем id кликнутого элемента в списке персонажей (onCharSelected)
      // передаем getData для передачи конкретной функции в пропсы (получение персонажей ИЛИ книг ИЛИ домов)
      // передаем renderItem, чтобы задать то, что мы хотим видеть в каждом элементе при рендере (имя, пол, можно любое свойство из объекта item (наш персонаж ИЛИ книга ИЛИ дом))
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllCharacters}
        renderItem={(item) => `${item.name} (${item.gender})`}
      />
    );

    // компонент itemDetails
    const itemDetails = (
      // передаем id из state в компонент ItemDetails
      // передаем getData для передачи конкретной функции в пропсы (получение персонажей ИЛИ книг ИЛИ домов)
      // с помощью компонента Field конкретно прописываем свойства выбранного
      // персонажа, книгу, дом, на который кликнули
      <ItemDetails
        charId={this.state.selectedChar}
        getData={this.gotService.getCharacter}
      >
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    );

    // компонент RowBlock также вынесли в отдельный файл, чтобы менять всё в одном месте
    return <RowBlock left={itemList} right={itemDetails} />;
  }
}
