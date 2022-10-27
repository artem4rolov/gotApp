import React, { useState, useEffect } from "react";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import "./randomChar.css";
import { PropTypes } from "prop-types";

// функциональный компонент
function RandomChar({ interval }) {
  // инициализируем подключение к базе данных GameOfThrones
  const got = new GotService();

  const [char, setChar] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // при маунтинге и обновлении компонента - перерисовываем его
    let timerId = setInterval(updateCharacter, interval);
    // при удалении компонента со страницы - выполняем функцию ниже
    return () => {
      clearInterval(timerId);
    };
  });

  // берем item из базы GOT и помещаем в стейт
  // останавливаем спиннер, ошибка в false
  function onCharLoaded(charFromBase) {
    setChar(charFromBase);
    setLoading(false);
    setError(false);
  }

  // если промис из updateCharacter выдал catch, вызываем эту функцию
  // ошибка - true (показываем надпись в компоненте), спиннер останавливаем
  function onError() {
    setError(true);
    setLoading(true);
  }

  // здесь получаем перса из базы данных и ставим его в стейт в функции onCharLoaded
  const updateCharacter = () => {
    const id = Math.floor(Math.random() * 140 + 25);
    // айдишка ниже для ошибки
    // const id = 130000000000;
    got.getCharacter(id).then(onCharLoaded).catch(onError);
    // console.log(this.got.getCharacter(id));
  };

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

export default RandomChar;

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
