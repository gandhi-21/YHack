const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(''); // Api key in the parameter

newsapi.v2.topHeadlines({
    language: 'en',
    country: 'us'
}).then(response => {
    console.log(response);
    exports.news = response;
});