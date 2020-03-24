import React from 'react';
import { IProps } from './../../types/index.d';
import MenuItem from './menuItem/menuItem';

const Sidebar= (props:IProps) => {
    const menuItems = [
        {
            label: 'Главная',
            url: '/',
            icon: 'fa-home'
        },
        {
            label: 'Новая запись',
            url: '/create',
            icon: 'fa-file-text'
        }
    ]

    return (
        <aside>
            <ul>
                {
                menuItems.map((item, i)=>(
                    <MenuItem key={i} {...item} />
                ))
                }
            </ul>
        </aside>
    );
}

export default Sidebar;
