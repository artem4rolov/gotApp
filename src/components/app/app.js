import React from "react";
import { Col, Row, Container, Button } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import { CharactersPage, HousesPage, BooksPage, BooksItem } from "../pages/";
import GotService from "../../services/gotService";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  gotService = new GotService();

  // изначально мы показываем рандомного перса
  // задаем начальный айди перса, который будет показан рядом со списком персонажей
  state = {
    showRandomChar: true,
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
      <Router>
        <div className="app">
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
            {/* роутинг по страницам */}
            <Routes>
              <Route
                path="/"
                exact
                element={<h1>Welcome to Game of Thrones DB</h1>}
              />
              <Route path="/characters" element={<CharactersPage />} />
              <Route path="/houses" element={<HousesPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route
                path="/books/:id"
                render={(match) => {
                  // console.log(match, location, history);
                  const { id } = match;
                  return <BooksItem bookId={id} />;
                }}
              />
            </Routes>
          </Container>
        </div>
      </Router>
    );
  }
}
