import React from "react";
import { Col, Row, Container, Button } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import CharacterPage from "../characterPage/characterPage";
import ErrorMessage from "../errorMessage";

export default class App extends React.Component {
  // изначально мы показываем рандомного перса
  // задаем начальный айди перса, который будет показан рядом со списком персонажей
  state = {
    showRandomChar: true,
    selectedChar: 130,
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  // тоглим наше значение в стейте для работы кнопки Toggle RandomChar
  toggleRandomChar = () => {
    this.setState({ showRandomChar: !this.state.showRandomChar });
  };

  render() {
    // получаем значение из стейта
    const showRandomChar = this.state.showRandomChar;

    // если значение true, показываем компонент RandomChar, если false - ничего не показываем
    const content = showRandomChar ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {/* тогглим компонент RandomChar */}
              {content}
              <Button
                color="primary"
                className="mb-5"
                onClick={this.toggleRandomChar}
              >
                Toggle RandomChar
              </Button>
            </Col>
          </Row>
          <CharacterPage />
        </Container>
      </>
    );
  }
}
