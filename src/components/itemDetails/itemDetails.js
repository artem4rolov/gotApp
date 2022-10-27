import React, { useState, useEffect } from "react";
import GotService from "../../services/gotService";
import "./itemDetails.css";

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Field };

// функциональный компонент
export default function ItemDetails({ charId, getData, ...props }) {
  const [item, setItem] = useState(null);

  // при монтировании компонента, получаем перса из метода updateChar
  useEffect(() => {
    updateChar();
    console.log("update details");
    // указывая вторым аргументом [charId] мы говорим реакту, чтобы обновлял компонент
    // itemDetails ТОЛЬКО после того, как мы получим новые пропсы (charID - новый
    // id элемента на который кликнули в компоненте ItemList)
  }, [charId]);

  // метод получает персонажа из базы GameOfThrones
  const updateChar = () => {
    // принимаем id из пропсов в компоненте App
    if (!charId) {
      // если вдруг ничего не пришло - ничего не делаем
      return;
    }

    // если получили айди из props, подключаемся к базе и получаем перса по id
    // и записываем в state
    getData(charId).then((itemFromBase) => {
      setItem(itemFromBase);
    });
    // код ниже - для ошибки в компоненте, пример использования
    // хука componentDidCatch
    // this.foo.bar = 1;
  };

  // если вдруг state с персонажем пуст - выводим сообщение
  if (!item) {
    return <span className="select-error">Please select element</span>;
  }

  const { name } = item;

  return (
    <div className="char-details rounded">
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        {/* при клике на какой-либо элемент из списка, мы делаем копии каждого Field
          (свойство объекта) из пропсов, а значения этих свойств берем из конкретного
          item, на который кликнули (персонаж, книга, дом) */}
        {React.Children.map(props.children, (child) => {
          return React.cloneElement(child, { item });
        })}
      </ul>
    </div>
  );
}
