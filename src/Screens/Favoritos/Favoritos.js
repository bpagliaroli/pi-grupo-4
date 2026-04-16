import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Favoritos extends Component {
    constructor(props){
        super(props);
        this.state = {
            peliculas: [],
            series: []
        }
    }

    componentDidMount(){
        if(!cookies.get("user-auth-cookie")){
    this.props.history.push("/login");
    return;
}
        let favs = localStorage.getItem("favoritos");

        if(favs !== null){
            let favoritos = JSON.parse(favs);

            let pelis = favoritos.filter(elem => elem.tipo === "pelicula");
            let series = favoritos.filter(elem => elem.tipo === "serie");

            this.setState({
                peliculas: pelis,
                series: series

            });
        }
    }

    eliminarFavorito = (id) => {
    let favs = JSON.parse(localStorage.getItem("favoritos"));

    let filtrados = favs.filter(elem => elem.id !== id);

    localStorage.setItem("favoritos", JSON.stringify(filtrados));

    let pelis = filtrados.filter(e => e.tipo === "pelicula");
    let series = filtrados.filter(e => e.tipo === "serie");

    this.setState({
        peliculas: pelis,
        series: series
    });
}


render(){
    return(
        <div>

            <h2>Películas favoritas</h2>

            {this.state.peliculas.map(p => (
                <div key={p.id}>
                    <Link to={`/detalle/${p.id}`}>
                        <p>{p.title}</p>
                    </Link>
                    <button onClick={() => this.eliminarFavorito(p.id)}>
                        Eliminar
                    </button>
                </div>
            ))}

            <h2>Series favoritas</h2>

            {this.state.series.map(s => (
                <div key={s.id}>
                    <Link to={`/detalle/${s.id}`}>
                        <p>{s.name}</p>
                    </Link>
                    <button onClick={() => this.eliminarFavorito(s.id)}>
                        Eliminar
                    </button>
                </div>
            ))}

        </div>
    )
}
}

export default Favoritos;