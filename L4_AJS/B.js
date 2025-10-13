const axios = require('axios');

function getUsersFiltered() {
    return axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            return response.data.map(user => ({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone
            }));
        })
        .catch(error => {
            console.error('Error:', error.message);
            throw error;
        });
}

getUsersFiltered()
    .then(users => {
        console.log('Users:');
        users.forEach(user => {
            console.log(`${user.id}. ${user.name} - ${user.email} - ${user.phone}`);
        });
    })
    .catch(error => console.error('Error:', error.message));