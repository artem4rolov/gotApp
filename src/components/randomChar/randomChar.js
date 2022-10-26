import React, { Component } from "react";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import "./randomChar.css";
import { PropTypes } from "prop-types";

export default class RandomChar extends Component {
  // инициализируем подключение к базе данных GameOfThrones
  got = new GotService();

  state = {
    char: {},
    loading: true,
    error: false,
  };

  // дефольные пропсы (интервал обновления рандомного персонажа)
  static defaultProps = {
    interval: 15000,
  };

  componentDidMount() {
    this.updateCharacter();
    this.timerId = setInterval(this.updateCharacter, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  // устанавливаем стейт в отдельной функции на будущее
  // если промис из updateCharacter выдал then, записываем в стейт случайного перса
  // из базы данных - 1) спиннер останавливаем, 2) ошибок нет

  onCharLoaded = (charFromBase) => {
    this.setState({
      char: charFromBase,
      loading: false,
      error: false,
    });
  };

  // если промис из updateCharacter выдал catch, вызываем эту функцию
  // ошибка - true (показываем надпись в компоненте), спиннер останавливаем
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  // здесь получаем перса из базы данных и ставим его в стейт в функции onCharLoaded
  updateCharacter = () => {
    const id = Math.floor(Math.random() * 140 + 25);
    // айдишка ниже для ошибки
    // const id = 130000000000;
    this.got.getCharacter(id).then(this.onCharLoaded).catch(this.onError);
    // console.log(this.got.getCharacter(id));
  };

  render() {
    // берем переменные из стейта
    const { char, loading, error } = this.state;

    // прописываем логику для контента
    // если есть какая-то ошибка, то помимо консоли, выводим сообщение об ошибке в компонент,
    // чтобы юзер понимал что происходит
    const errorMessage = error ? <ErrorMessage /> : null;
    // если загрузка не завершена, и ошибок нет, продолжаем показывать спиннер
    const spinner = loading ? <Spinner /> : null;
    // если нет никаких ошибок и загрузка персонажа завершилась успешно, показываем
    // данные (компонент View), прописываем для компонента View пропсы (char из стэйта)
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
      <div className="random-block rounded">
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}

// проверям, что наш переменная interval является числом
RandomChar.propTypes = {
  interval: PropTypes.number,
};

// отделяем основную верстку, чтобы спиннер и сообщение об ошибке показывались
// отдельно в компоненте, на белом фоне, иначе - все будет как в шаурме
const View = ({ char }) => {
  // берем данные из props
  const { name, gender, born, died, culture } = char;

  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  );
};
