import React from "react";
import { Container } from "reactstrap";
import {
  CharactersPage,
  HousesPage,
  BooksPage,
  BooksItem,
  NotFoundPage,
  ExamplePage,
} from "../pages/";
import Layout from "../layout";
import GotService from "../../services/gotService";
import { Routes, Route } from "react-router-dom";
import ErrorMessage from "../errorMessage";

export default class App extends React.Component {
  gotService = new GotService();

  // изначально мы показываем рандомного перса
  // задаем начальный айди перса, который будет показан рядом со списком персонажей
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    return (
      <Container>
        {/* роутинг по страницам */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Welcome to Game of Thrones DB</h1>} />
            <Route path="characters" element={<CharactersPage />} />
            <Route path="houses" element={<HousesPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="books/:id" element={<ExamplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Container>
    );
  }
}
