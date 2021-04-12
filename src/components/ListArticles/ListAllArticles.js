import React, { useState, useEffect } from 'react';
import { callNewsAPI } from '../../interceptor/api';
import { model } from '../../interceptor/model';
import { loadingResponse } from '../../interceptor/response';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import "./masonry.css";

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
};

const MasonryArray = (data) => {
    console.log(data)
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {data.data.map((item) => {
                return <div key={item.PostUrl}>
                    <div>URL: {item.PostUrl} </div>
                    <div>title: {item.Title}</div>
                    <div>Description: {item.Description}</div>
                </div>
            })}
        </Masonry>
    )
}

const ListAllArticles = () => {
    const [articles, setArticles] = useState(loadingResponse())

    useEffect(() => {
        callNewsAPI({}, model.LIST_ARTICLES.endpoint).then((resp) => setArticles(resp))
    }, [])

    if (!articles || articles.isLoading) {
        return <Spinner animation="grow" />
    } else if (articles.isError) {
        return <Alert variant='danger' >{articles.data.message || articles.statusText}</Alert>
    } else {
        return (
            <MasonryArray data={articles.data} />
        )
    }
};

export default ListAllArticles;