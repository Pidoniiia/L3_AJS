const axios = require('axios');

function getCommentsSorted(callback) {
    axios.get('https://jsonplaceholder.typicode.com/comments')
        .then(response => {
            const sortedComments = response.data.sort((a, b) => a.name.localeCompare(b.name));
            callback(null, sortedComments);
        })
        .catch(error => {
            console.error('Ошибка при загрузке комментариев:', error.message);
            callback(error, null);
        });
}

function getTodosFiltered() {
    return axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
            const incompleteTodos = response.data.filter(todo => !todo.completed);
            console.log(`Найдено ${incompleteTodos.length} невыполненных задач из ${response.data.length}`);
            return incompleteTodos;
        })
        .catch(error => {
            console.error('Ошибка при получении задач:', error.message);
            throw error;
        });
}

getCommentsSorted((error, comments) => {
    if (error) {
        console.error('Не удалось получить комментарии:', error.message);
        return;
    }
    
    const commentsToShow = Math.min(comments.length, 10);
    for (let i = 0; i < commentsToShow; i++) {
        console.log(`Комментарий ${i}: ${comments[i].name}`);
    }
    
    getTodosFiltered()
        .then(todos => {
            console.log('Невыполненные задачи:');
            todos.slice(0, 5).forEach(todo => console.log(`- ${todo.title}`));
        })
        .catch(error => console.error('Не удалось загрузить задачи:', error.message));
});