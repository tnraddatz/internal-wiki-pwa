import React from 'react';
import { Link } from 'react-router-dom';

const PageList = () => {
    const pages = [
        { url: '/', title: 'Home' },
        { url: '/profile', title: 'Profile' },
        { url: '/register', title: 'Register' },
        { url: '/signin', title: 'Sign In' }
    ];

    return (
        <ul>
            {
                pages.map((v, i) => (
                    <li key={i}><Link to={v.url}>{v.title}</Link></li>
                ))
            }
        </ul>
    );
};

export default PageList;