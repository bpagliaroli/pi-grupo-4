import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { valor: ""};
  }

  controlarCambios(event) {
    this.setState({
      valor: event.target.value
    });
  }

  evitarSubmit(event) {
    event.preventDefault();

    this.props.history.push("/results?search=" + this.state.valor);
  }

  render() {
    return (
      <main>
        <h2>Buscador</h2>

        <form onSubmit={(event) => this.evitarSubmit(event)}>
          
          <input
            type="text"
            placeholder="Buscar..."
            value={this.state.valor}
            onChange={(event) => this.controlarCambios(event)}
          />

          <button type="submit">Buscar</button>

        </form>
      </main>
    );
  }
}

export default withRouter(Home);