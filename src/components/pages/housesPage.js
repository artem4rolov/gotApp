import React from "react";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class HousesPage extends React.Component {
  gotService = new GotService();

  state = {
    selectedHouse: 130,
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  // принимаем id кликнутого элемента (персонажа из списка в компоненте itemList)
  // и записываем в стейт для того, чтобы передать этот id в компонент charDetails,
  // где выведем подробную инфу о выбранном доме из списка
  onItemSelected = (id) => {
    this.setState({ selectedHouse: id });
  };

  render() {
    // выносим наши компоненты itemList и itemDetails в отдельные переменные,
    // чтобы не копировать трижды этот код, а менять всё что нужно в одном месте
    if (this.state.error) {
      return <ErrorMessage />;
    }

    // компонент itemList
    const itemList = (
      // принимаем id кликнутого элемента в списке ljvjd (onItemSelected)
      // передаем getData для передачи конкретной функции в пропсы (получение персонажей ИЛИ книг ИЛИ домов)
      // передаем renderItem, чтобы задать то, что мы хотим видеть в каждом элементе при рендере (имя, пол, можно любое свойство из объекта item (наш персонаж ИЛИ книга ИЛИ дом))
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllHouses}
        renderItem={(item) => `${item.name} (${item.region})`}
      />
    );

    // компонент itemDetails
    const itemDetails = (
      // передаем id из state в компонент itemDetails
      // передаем getData для передачи конкретной функции в пропсы (получение персонажей ИЛИ книг ИЛИ домов)
      <ItemDetails
        charId={this.state.selectedHouse}
        getData={this.gotService.getHouse}
      >
        {/* поля, которые будут отображаться при клике на дом */}
        {/* field - значение из БД, label - надпись напротив значения из БД */}
        <Field field="words" label="Words" />
        <Field field="titles" label="Titles" />
        <Field field="overlord" label="Overlord" />
        <Field field="ancestralWeapons" label="Ancestral weapons" />
      </ItemDetails>
    );

    // компонент RowBlock также вынесли в отдельный файл, чтобы менять всё в одном месте
    return <RowBlock left={itemList} right={itemDetails} />;
  }
}
