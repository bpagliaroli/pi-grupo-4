import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./SearchForm.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: "",
      tipo: "populares"
    };
  }

  controlarCambios(event) {
    this.setState({
      valor: event.target.value
    });
  }

  enviarFormulario(event) {
    event.preventDefault();

    this.props.history.push("/results/" + this.state.valor + "/" + this.state.tipo);
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={(event) => this.enviarFormulario(event)}
      >
        <div className="search-form-type">
          <label>
            <input
              type="radio"
              name="tipo"
              value="populares"
              checked={this.state.tipo === "populares"}
              onChange={(e) => this.setState({ tipo: e.target.value })}
            />
            Populares
          </label>

          <label>
            <input
              type="radio"
              name="tipo"
              value="cartelera"
              checked={this.state.tipo === "cartelera"}
              onChange={(e) => this.setState({ tipo: e.target.value })}
            />
            Cartelera
          </label>
        </div>

        <input
          className="search-form-input"
          type="text"
          placeholder="Buscar..."
          value={this.state.valor}
          onChange={(event) => this.controlarCambios(event)}
        />
        <button className="search-form-button" type="submit">
          Buscar
        </button>
      </form>
    );
  }
}

export default withRouter(SearchForm);
