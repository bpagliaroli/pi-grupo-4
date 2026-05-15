import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./SearchForm.css";

function SearchForm(props) {
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("populares");

  function controlarCambios(event) {
    setValor(event.target.value);
  }

  function enviarFormulario(event) {
    event.preventDefault();

    props.history.push("/results/" + valor + "/" + tipo);
  }

  return (
    <form className="search-form" onSubmit={enviarFormulario}>
      <div className="search-form-type">
        <label>
          <input
            type="radio"
            name="tipo"
            value="populares"
            checked={tipo === "populares"}
            onChange={(e) => setTipo(e.target.value)}
          />
          Populares
        </label>

        <label>
          <input
            type="radio"
            name="tipo"
            value="cartelera"
            checked={tipo === "cartelera"}
            onChange={(e) => setTipo(e.target.value)}
          />
          Cartelera
        </label>
      </div>

      <input
        className="search-form-input"
        type="text"
        placeholder="Buscar..."
        value={valor}
        onChange={controlarCambios}
      />
      <button className="search-form-button" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default withRouter(SearchForm);
