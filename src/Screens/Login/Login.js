import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "", //capturar lo que escribe el usuario en el input --> estado
      password: "",
      error: ""
    };
  }

  enviarFormulario(e) { //se ejecuta cuando el usuario manda el formulario
    e.preventDefault(); // evita que la página se recargue al tocar el botón submit

    let usuarios = localStorage.getItem("usuarios"); //se guardan los usuarios que se guardaron desde CrearCuenta

    if (usuarios === null) {
      return this.setState({
        error: "Credenciales incorrectas"
      });
    }

    usuarios = JSON.parse(usuarios); 

    let usuarioEncontrado = null;

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === this.state.email) { //compara el que escribió la persona con los que estaban guardados
        usuarioEncontrado = usuarios[i]; // si lo encuentra se guarda en usuarioEncontrado
      }
    }

    if (
      usuarioEncontrado &&
      usuarioEncontrado.password === this.state.password //que exista ese mail y que la contraseña coincida con la guardada
    ) {
      // guardar sesión
      localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify(usuarioEncontrado)
      );

      // redirigir al home
      this.props.history.push("/");
    } else {
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
          onChange={(e) => this.setState({ email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />

        <button type="submit">Ingresar</button>

        {this.state.error !== "" && <p>{this.state.error}</p>}
      </form>
    );
  }
}

export default Login;
