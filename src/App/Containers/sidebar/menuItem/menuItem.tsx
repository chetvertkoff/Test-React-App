import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem= (prop) => {

    return (
        <li className="menuItem">
            <NavLink to={prop.url} exact activeClassName="active">
                <i className={`fa ${prop.icon}`}></i>
                {prop.label}
            </NavLink>
        </li>
    );
}

export default MenuItem
