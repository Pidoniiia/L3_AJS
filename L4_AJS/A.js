const axios = require('axios');

function getPostsSorted(callback) {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            const sortedPosts = response.data.sort((a, b) => b.title.length - a.title.length);
            callback(null, sortedPosts);
        })
        .catch(error => {
            console.error('Ошибка при получении постов:', error.message);
            callback(error, null);
        });
}

getPostsSorted((err, posts) => {
    if (err) {
        console.error('Не удалось получить посты:', err.message);
    } else {
        console.log('Топ-5 постов с самыми длинными названиями:');
        posts.slice(0, 5).forEach((post, index) => {
            console.log(`${index + 1}. "${post.title}" (${post.title.length} символов)`);
        });
    }
});
getPostsSorted((error, posts) => {
    if (error) {
        console.error('Не удалось получить посты:', error.message);
        return;
    }
    
    const postsToShow = Math.min(posts.length, 7);
    for (let i = 0; i < postsToShow; i++) {
        console.log(`Пост ${i}: "${posts[i].title}" (символов: ${posts[i].title.length})`);
    }
});