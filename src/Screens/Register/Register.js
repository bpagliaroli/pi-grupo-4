import { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",    //capturar lo que escribe el usuario en el input --> estado
      password: "",
      error: ""
    };
  }
  // que no se envíe el formulario
  enviarFormulario(event) {
    event.preventDefault();

    let usuarios = localStorage.getItem("usuarios");

    if (usuarios === null) {
    usuarios = [];
    } else {
    usuarios = JSON.parse(usuarios);
    }

    // para la validación de la contraseña
    if (this.state.password.length < 6) {
      return this.setState({
        error: "La contraseña debe tener mínimo 6 caracteres"
      });
    }

    // validación del email repetido
    let existe = false;

    for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === this.state.email) {
        existe = true;
    }
    }
    if (existe) {
      return this.setState({
        error: "El email ya está registrado"
      });
    }

    // crear usuario
    let nuevoUsuario = {
      email: this.state.email,
      password: this.state.password
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // aca se limpia el form
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
