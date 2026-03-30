import React from 'react';
import { Link } from 'react-router-dom';

function Navelement(props) {
    return(
        <li className="nav-item">
            <Link className="nav-link" to={props.to}>{props.opcion}</Link>
        </li>
    )
}
export default Navelement