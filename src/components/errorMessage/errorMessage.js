import React from "react";
import "./errorMessage.css";
// импортим картинку из текущей директории
import img from "./error.jpg";

const ErrorMessage = () => {
  return (
    <>
      {/* alt для тега img в реакте обязателен! */}
      <img src={img} alt="сообщение об ошибке" />
      <span>Something goes wrong...</span>
    </>
  );
};

export default ErrorMessage;
