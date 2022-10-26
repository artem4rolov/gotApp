import React, { Component } from "react";
import GotService from "../../services/gotService";
import ItemDetails, { Field } from "../itemDetails";

export default class BooksItem extends Component {
  gotService = new GotService();

  // state = {
  //   selectedBook: 3,
  //   error: false,
  // };

  render() {
    return (
      // <ItemDetails
      //   // charId={this.state.selectedBook}
      //   charId={this.props.bookId}
      //   getData={this.gotService.getBook}
      // >
      //   {/* поля, которые будут отображаться при клике на книгу */}
      //   {/* field - значение из БД, label - надпись напротив значения из БД */}
      //   <Field field="numberOfPages" label="Number of Pages" />
      //   <Field field="publiser" label="Publiser" />
      //   <Field field="released" label="Released" />
      // </ItemDetails>
      1
    );
  }
}
