import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  controlarEmail(e) {
    this.setState({
      email: e.target.value,
      error: ""
    });
  }

  controlarPassword(e) {
    this.setState({
      password: e.target.value,
      error: ""
    });
  }

  enviarFormulario(e) {
    e.preventDefault();

    // Convertir email a minúsculas para comparación
    const email = this.state.email.toLowerCase();
    const password = this.state.password;

    let usuarios = localStorage.getItem("usuarios");

    if (usuarios === null) {
      return this.setState({
        error: "Credenciales incorrectas"
      });
    }

    usuarios = JSON.parse(usuarios);

    let usuarioEncontrado = null;

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email.toLowerCase() === email) {
        usuarioEncontrado = usuarios[i];
      }
    }

    if (
      usuarioEncontrado &&
      usuarioEncontrado.password === password
    ) {
      localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify(usuarioEncontrado)
      );

      cookies.set("user-auth-cookie", usuarioEncontrado.email, {
        path: "/"
      });

      // Limpiar formulario después de login exitoso
      this.setState({
        email: "",
        password: "",
        error: ""
      });

      this.props.history.push("/");
    } 
    else {
      this.setState({
        error: "Datos incorrectos"
      });
    }
  }

  render() {
    return (
      <form onSubmit={(e) => this.enviarFormulario(e)}>
        <input
          type="email"
          placeholder="Email"
          value={this.state.email}
          onChange={(e) => this.controlarEmail(e)}
        />

        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={(e) => this.controlarPassword(e)}
        />

        <button type="submit">Ingresar</button>

        <p>{this.state.error !== "" ? this.state.error : ""}</p>
      </form>
    );
  }
}

export default Login;
