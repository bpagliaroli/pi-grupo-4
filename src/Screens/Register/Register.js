import { Component } from "react";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",    
      password: "",
      error: ""
    };
  }

  enviarFormulario(event) {
    event.preventDefault();

    const email = this.state.email.toLowerCase();
    const password = this.state.password;
    let usuarios = localStorage.getItem("usuarios");

    if (usuarios) {
      usuarios = JSON.parse(usuarios);
    } else {
      usuarios = [];
    }

    if (password.length < 6) {
      return this.setState({
        error: "La contraseña debe tener mínimo 6 caracteres"
      });
    }

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email.toLowerCase() === email) {
        return this.setState({
          error: "El email ya está registrado"
        });
      }
    }

    const nuevoUsuario = {
      email: email,
      password: password
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    this.setState({
      email: "",
      password: "",
      error: ""
    });

    this.props.history.push("/login");
  }

  controlarEmail(event) {
    this.setState({
      email: event.target.value,
      error: ""
    });
  }

  controlarPassword(event) {
    this.setState({
      password: event.target.value,
      error: ""
    });
  }

  render() {
    return (
      <div className="register-container">
        <form className="register-form" onSubmit={(event) => this.enviarFormulario(event)}>
          <h2>Crear cuenta</h2>

          <input
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={(event) => this.controlarEmail(event)}
          />

          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(event) => this.controlarPassword(event)}
          />

          <button type="submit">Crear cuenta</button>

          <p>{this.state.error !== "" ? this.state.error : ""}</p>
        </form>
      </div>
    );
  }
}

export default Register;
