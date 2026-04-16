import React, { Component } from "react";

class Favoritos extends Component {
    constructor(props){
        super(props);
        this.state = {
            peliculas: [],
            series: []
        }
    }

    componentDidMount(){
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

    render(){
        return(
            <div>
                <h2>Películas favoritas</h2>
                {this.state.peliculas.map(p => (
                    <p key={p.id}>{p.nombre}</p>
                ))}

                <h2>Series favoritas</h2>
                {this.state.series.map(s => (
                    <p key={s.id}>{s.nombre}</p>
                ))}
            </div>
        )
    }
}

export default Favoritos;