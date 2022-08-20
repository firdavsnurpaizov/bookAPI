
// const baseURL = {
//     baseURL: 'http://localhost:5000',
//     header: {
//         accept: 'application/json',
//         'Content-Type': 'application/json'
//     }
// }



export async function signin(data) {
    return fetch('http://localhost:5000/signin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(responce => responce)
}

export function login(data) {
    return fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    // .then(responce => responce)
}

export async function authMe() {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch('http://localhost:5000/me', {
        method: 'GET',
        headers: {
            'X-Auth': token
        }
    }).then(response => response.json())
}

export async function getBooksFromAPI() {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch('http://localhost:5000/books', {
        method: 'GET',
        headers: {
            'X-Auth': token
        }
    }).then(response => response.json())
}

export async function deleteBookFromAPI(id) {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`http://localhost:5000/books/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'X-Auth': token
        }
    }).then(response => response.json())
}

export async function createBook(data) {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch('http://localhost:5000/books/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth': token
        }
    }).then(responce => responce.json())
}

export async function getBooksItemFromAPI(id) {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`http://localhost:5000/books/${id}`, {
        method: 'GET',
        headers: {
            'X-Auth': token
        }
    }).then(response => response.json())
}

export async function updateBook(id, data) {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`http://localhost:5000/books/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth': token
        }
    }).then(responce => responce.json())
}

export async function isFav(id, data) {
    const token = JSON.parse(localStorage.getItem('token'))
    return fetch(`http://localhost:5000/books/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth': token
        }
    }).then(responce => responce.json())
}