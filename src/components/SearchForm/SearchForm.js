import React from "react";
import "./SearchForm.css";

function SearchForm(props) {
  return (
    <form className="search-form" onSubmit={props.onSubmit}>
      <input
        className="search-form-input"
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <button className="search-form-button" type="submit">Buscar</button>
    </form>
  );
}

export default SearchForm;
