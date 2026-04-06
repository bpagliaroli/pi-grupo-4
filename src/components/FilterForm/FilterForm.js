import React from "react";
import "./FilterForm.css";

function FilterForm(props) {
  return (
    <form className="filter-form">
      <input
        className="filter-form-input"
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </form>
  );
}

export default FilterForm;
