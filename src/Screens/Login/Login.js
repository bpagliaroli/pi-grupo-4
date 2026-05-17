import React, { useState } from "react";
import Cookies from "universal-cookie";
import Navbar from "../../components/Navbar/Navbar";
import "./Login.css";

const cookies = new Cookies();

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function controlarEmail(event) {
    setEmail(event.target.value.toLowerCase());
    setError("");
  }

  function controlarPassword(event) {
    setPassword(event.target.value);
    setError("");
  }

  function enviarFormulario(event) {
    event.preventDefault();

    let usuarios = localStorage.getItem("usuarios");

    if (usuarios === null) {
      setError("Credenciales incorrectas");
      return;
    }

    usuarios = JSON.parse(usuarios);

    let usuarioEncontrado = null;

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email.toLowerCase() === email.toLowerCase()) {
        usuarioEncontrado = usuarios[i];
      }
    }

    if (usuarioEncontrado && usuarioEncontrado.password === password) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

      cookies.set("user-auth-cookie", usuarioEncontrado.email, {
        path: "/"
      });

      setEmail("");
      setPassword("");
      setError("");

      props.history.push("/");
    } else {
      setError("Datos incorrectos");
    }
  }

  return (
    <div className="login-container">
      <Navbar />
      <form className="login-form" onSubmit={enviarFormulario}>
        <h2>Ingresar</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={controlarEmail}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={controlarPassword}
        />

        <button type="submit">Ingresar</button>

        <p>{error !== "" ? error : ""}</p>
      </form>
    </div>
  );
}

export default Login;
