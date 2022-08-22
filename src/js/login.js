import { login } from "../api"
import { isValid } from '../utils'

const signin = document.querySelector('.signin')
const username = document.querySelector('.signin-name')
const password = document.querySelector('.signin-password')
const warningName = document.querySelector('.signin-name__warning')
const warningPassword = document.querySelector('.signin-password__warning')

if (document.querySelector('#main')) {

    const data = {
        username: username.value,
        password: password.value
    }

    username.oninput = (e) => {
        data.username = e.target.value
        warningName.style.opacity = 0
        warningName.style.visibility = 'hidden'
    }

    password.oninput = (e) => {
        data.password = e.target.value
        warningPassword.style.opacity = 0
        warningPassword.style.visibility = 'hidden'
    }

    signin.addEventListener('submit', (e) => {
        e.preventDefault()
        if (isValid(username.value) && isValid(password.value)) {
            login(data).then(async (response) => {
                if (response.status === 200) {
                    const data = await response.json()
                    localStorage.setItem('token', JSON.stringify(data.token))
                    location.assign('../books.html')
                } else if (response.status === 403) {
                    console.log('Неверный логин или пароль');
                } else if (response.status === 400) {
                    console.log("error")
                }
            })
        } else {
            if (!isValid(username.value)) {
                warningName.style.opacity = 1
                warningName.style.visibility = 'visible'
            }
            if (!isValid(password.value)) {
                warningPassword.style.opacity = 1
                warningPassword.style.visibility = 'visible'
            }
        }
    })
}