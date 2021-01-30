import React, { useState, useEffect } from 'react';
import { callNewsAPI } from '../interceptor/api';
import { model } from '../interceptor/model';
import { loadingResponse } from '../interceptor/response';
import ListAllArticles from '../components/ListArticles/ListAllArticles';
import { Form, Button, Alert } from 'react-bootstrap';
import Masonry from 'react-masonry-css';

const Home = () => {
    return (
        <ListAllArticles />
    );
};

export default Home;