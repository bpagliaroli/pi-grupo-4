import { Component } from "react";

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

    let usuarios = localStorage.getItem("usuarios");

    if (usuarios === null) {
    usuarios = [];
    } else {
    usuarios = JSON.parse(usuarios);
    }

    // Convertir email a minúsculas
    const email = this.state.email.toLowerCase();
    const password = this.state.password;

    if (password.length < 6) {
      return this.setState({
        error: "La contraseña debe tener mínimo 6 caracteres"
      });
    }

    let existe = false;

    for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email.toLowerCase() === email) {
        existe = true;
    }
    }
    if (existe) {
      return this.setState({
        error: "El email ya está registrado"
      });
    }

    let nuevoUsuario = {
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

    alert("¡Cuenta creada con éxito!");
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
      <form onSubmit={(event) => this.enviarFormulario(event)}>
        
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

        {this.state.error !== "" && <p>{this.state.error}</p>}
      </form>
    );
  }
}

export default Register;
