import React from "react";
import { Col, Row, Container, Button } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import { Outlet } from "react-router-dom";

export default class Layout extends React.Component {
  state = {
    showRandomChar: true,
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
      <div>
        {/* создаем layout приложения - элементы, которые всегда будут
        присутствовать на странице */}
        <Container>
          <Header />
        </Container>
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
        {/* здесь будет всё остальное приложение */}
        <Outlet />
      </div>
    );
  }
}
