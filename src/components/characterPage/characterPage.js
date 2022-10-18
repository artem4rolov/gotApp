import React from "react";
import { Col, Row, Container, Button } from "reactstrap";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import ErrorMessage from "../errorMessage";

export default class CharacterPage extends React.Component {
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
  onCharSelected = (id) => {
    this.setState({ selectedChar: id });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <Row>
        <Col md="6">
          {/* принимаем id кликнутого элемента в списке персонажей */}
          <ItemList onCharSelected={this.onCharSelected} />
        </Col>
        <Col md="6">
          {/* передаем id из state в компонент CharDetails */}
          <CharDetails charId={this.state.selectedChar} />
        </Col>
      </Row>
    );
  }
}
