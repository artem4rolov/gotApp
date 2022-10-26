import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundPage = () => {
  const Title = styled.h1`
    color: white;
  `;

  const GoBack = styled.span`
    color: green;
    cursor: pointer;
    ::
  `;

  return (
    <Title>
      Sorry, there is nothing, please{" "}
      <GoBack>
        <Link to="/characters">go back</Link>
      </GoBack>
    </Title>
  );
};

export { NotFoundPage };
