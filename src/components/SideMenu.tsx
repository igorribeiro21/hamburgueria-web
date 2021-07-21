import React from 'react';

import '../styles/components/SideMenu.css';
import logo from '../imgs/logo.jpeg';
import { Link } from 'react-router-dom';

export default function SideMenu() {
    return (
        <div className='SideContainer'>
            <img src={logo} alt="" />
            <h1>Menu</h1>
            <Link
                id='product'
                to='/product'
            >Produtos</Link>
            <Link 
                id='dashboard'
                to='/dashboard'
            >Usuários</Link>

        </div>
    )
}