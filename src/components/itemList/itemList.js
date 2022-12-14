import React, { useState, useEffect } from "react";
import Spinner from "../spinner";
import "./itemList.css";

// функциональный компонент
function ItemList({ getData, onItemSelected, renderItem }) {
  const [itemList, updateList] = useState([]);

  // получаем персов через GotService и записываем их в стейт
  useEffect(() => {
    getData().then((data) => {
      updateList(data);
      console.log("update list");
    });
    // второй аргумент в useEffect передается, когда ЭФФЕКТ (изменение) нужно выполнить
    // только при появлении компонента и его исчезновении
    // если не передавать аргумент, в данном случае произойдет утечка памяти
  }, []);

  // рендерим элементы li на основании массива объектов с персами, который получили из
  // GotService, но используем этот метод при рендеринге,
  // задаем аргументом наш массив с объектами (персами) из стейта
  function renderItems(arr) {
    // обязательно в аргументах при map задаем сам элемент и его номер по порядку,
    // т.к. react должен будет понимать, какой уникальный номер у каждого элемента
    // и использовать это для последующих обработчиков событий, по типу клика
    return arr.map((item) => {
      const { id } = item;
      const label = renderItem(item);
      // в key элемента li записываем id персонажа из базы, отрезаем всю строку
      // со свойства url, и оставляем лишь номер персонажа в базе
      // т.к. мы находимся на 5ой странице - номера идут от 41 до 50
      return (
        <li
          key={id}
          className="list-group-item"
          // приходит из пропсов в компоненте App, для передачи номера элемента
          // необходимо указывать как стрелочную функцию
          // 41 + i т.к. у нас 5ая страница в базе, где у персонажей есть хоть
          // какие-то данные
          onClick={() => onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  // если массив пуст - показываем спиннер
  if (!itemList) {
    return <Spinner />;
  }

  // если массив не пуст, прогоняем его через функицю renderItems, которая
  // возвращает нам верстку с элементами li, в которых имена наших персов
  const items = renderItems(itemList);

  return <ul className="item-list list-group">{items}</ul>;
}

// задаем дефолтные пропсы
ItemList.defaultProps = {
  onItemSelected: () => {},
};

export default ItemList;
