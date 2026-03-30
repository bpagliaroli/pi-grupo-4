import React from 'react'

function Navuserinfo(props) {
    return(
        <li>
            <span>{props.userinfo}</span>
            <img src={props.image} alt={props.userinfo} />
        </li>
    )
}
export default Navuserinfo