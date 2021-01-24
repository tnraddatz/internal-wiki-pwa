export const model = {
    LIST_ARTICLES: {
        endpoint: '/listArticles',
        body: {}
    },
    POST_ARTICLE: {
        endpoint: '/postArticle',
        body: {
            PostUrl: null,
            Title: null
        }
    }
}