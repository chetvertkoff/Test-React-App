import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

const Header =(
    <header>
        <NavLink to={'/'}>
            <img src={'/img/icon-square-small1.png'} className='logo' />
        </NavLink>
    </header>
)


export default Header