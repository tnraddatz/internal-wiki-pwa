import React, { useState, useEffect } from 'react';
import { callNewsAPI } from '../interceptor/api';
import { loadingResponse } from '../interceptor/response';
import { Form, Button, Alert } from 'react-bootstrap';

const Home = () => {
    const [post, setPost] = useState(loadingResponse())
    const [websiteUrl, setWebsiteUrl] = useState('')
    const [websiteTitle, setWebsiteTitle] = useState('')
    const onSubmitForm = (e) => {
        e.preventDefault();
        callNewsAPI('post', {}, '/listArticles').then((resp) => setPost(resp))
    }

    return (
        <div>
            {
                post.isError && <Alert variant='danger' >{post.data.message || post.statusText}</Alert>
            }
            <br />
            <Form onSubmit={(e) => onSubmitForm(e)}>
                <Form.Group controlId="articleUrl">
                    <Form.Label>News Article URL</Form.Label>
                    <Form.Control type="text" placeholder="www.news.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="articleTitle">
                    <Form.Label>News Article Title</Form.Label>
                    <Form.Control type="text" placeholder="news title" value={websiteTitle} onChange={(e) => setWebsiteTitle(e.target.value)} required />
                </Form.Group>

                <Button disabled={!websiteUrl || !websiteTitle} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <br />
            {
                post.data && JSON.stringify(post)
            }
        </div>
    );
};

export default Home;