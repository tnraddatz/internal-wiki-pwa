import React from 'react';
import { Auth } from 'aws-amplify';
import PostArticleForm from '../components/ArticleForm/postArticleForm'

class PostArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <PostArticleForm />
        )
    }
}

export default PostArticle;