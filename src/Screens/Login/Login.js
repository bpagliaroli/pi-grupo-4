import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "", 
      password: "",
      error: ""
    };
  }

  enviarFormulario(e) { 
    e.preventDefault(); 

    let usuarios = localStorage.getItem("usuarios"); 

    if (usuarios === null) {
      return this.setState({
        error: "Credenciales incorrectas"
      });
    }

    usuarios = JSON.parse(usuarios); 

    let usuarioEncontrado = null;

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === this.state.email) { 
        usuarioEncontrado = usuarios[i]; 
      }
    }

    if (
      usuarioEncontrado &&
      usuarioEncontrado.password === this.state.password 
    ) {
      
      localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify(usuarioEncontrado)
      );

      
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
