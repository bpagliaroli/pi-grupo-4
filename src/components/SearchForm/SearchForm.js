import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./SearchForm.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: ""
    };
  }

  controlarCambios(event) {
    this.setState({
      valor: event.target.value
    });
  }

  enviarFormulario(event) {
    event.preventDefault();
    this.props.history.push("/results/" + this.state.valor);
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={(event) => this.enviarFormulario(event)}
      >
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
