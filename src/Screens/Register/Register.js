import { useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.css";

function Register () {
  const [email, setemail] = useState ([""])
  const [password, setpassword] = useState ([""])
  const [error, seterror] = useSatate ([""])
 

  enviarFormulario(event) {
    event.preventDefault();

    const email = setemail.toLowerCase();
    const password = setpassword;
    let usuarios = localStorage.getItem("usuarios");

    if (usuarios) {
      usuarios = JSON.parse(usuarios);
    } else {
      usuarios = [];
    }

    if (password.length < 6) {
      return seterror ({
        error: "La contraseña debe tener mínimo 6 caracteres"
      });
    }

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email.toLowerCase() === email) {
        return seterror ({
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

    setemail("");
    setpassword("");
    seterror("");
    props.history.push("/login");
  }

  function controlarEmail(event) {
    setemail (event.target.value) ;
    seterror ([""])
    
  }

  function controlarPassword(event) { 
    setpassword (event.target.value)
    seterror ([""])
  
  
  }

  render() {
    return (
      <div className="register-container">
        
        <Navbar />
        <form className="register-form" onSubmit={(event) => enviarFormulario(event)}>
          <h2>Crear cuenta</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => controlarEmail(event)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => controlarPassword(event)}
          />

          <button type="submit">Crear cuenta</button>

          <p>{error !== "" ? error : ""}</p>
        </form>
      </div>
    );
  }
}

export default Register;
