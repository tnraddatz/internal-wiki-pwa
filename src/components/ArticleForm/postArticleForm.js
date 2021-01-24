import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

//interceptor
import { model } from '../../interceptor/model';
import { loadingResponse } from '../../interceptor/response';
import { callNewsAPI } from '../../interceptor/api';

const PostArticleForm = () => {
    const [post, setPost] = useState(loadingResponse())
    const [websiteUrl, setWebsiteUrl] = useState('')
    const [websiteTitle, setWebsiteTitle] = useState('')

    const onSubmitForm = (e) => {
        e.preventDefault();
        let body = model.POST_ARTICLE.body;
        body.PostUrl = websiteUrl;
        body.Title = websiteTitle;
        callNewsAPI(body, model.POST_ARTICLE.endpoint).then((resp) => setPost(resp))
    }

    return (
        <div>
            {
                post.isError && <Alert variant='danger' >{post.data.message || post.statusText}</Alert>
            }
            <br />
            <Form onSubmit={(e) => onSubmitForm(e)}>
                <Form.Group controlId="articleUrl">
                    <Form.Label>Article URL</Form.Label>
                    <Form.Control type="text" placeholder="www.news.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="articleTitle">
                    <Form.Label>Article Title</Form.Label>
                    <Form.Control type="text" placeholder="title" value={websiteTitle} onChange={(e) => setWebsiteTitle(e.target.value)} required />
                </Form.Group>

                <Button disabled={!websiteTitle || !websiteUrl} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <br />
            {
                post.data && JSON.stringify(post)
            }
        </div>
    )
}

export default PostArticleForm;