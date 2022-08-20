import { signin } from "../api"
import { isValid } from "../utils"

const form = document.querySelector('.signup')
const username = document.querySelector('.form-name')
const surname = document.querySelector('.form-surname')
const age = document.querySelector('.form-age')
const password = document.querySelector('.form-password')

const warningName = document.querySelector('.warning-name')
const warningSurname = document.querySelector('.warning-surname')
const warningNum = document.querySelector('.warning-num')
const warningPassword = document.querySelector('.warning-password')

if (document.querySelector('#main')) {

    const data = {
        username: username.value,
        surname: surname.value,
        age: age.value,
        password: password.value
    }

    username.oninput = (e) => {
        data.username = e.target.value
        warningName.style.opacity = 0
        warningName.style.visibility = 'hidden'

    }
    surname.oninput = (e) => {
        data.surname = e.target.value
        warningSurname.style.opacity = 0
        warningSurname.style.visibility = 'hidden'
    }
    age.oninput = (e) => {
        data.age = e.target.value
        warningNum.style.opacity = 0
        warningNum.style.visibility = 'hidden'
    }
    password.oninput = (e) => {
        data.password = e.target.value
        warningPassword.style.opacity = 0
        warningPassword.style.visibility = 'hidden'
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (isValid(username.value) && isValid(surname.value) && isValid(age.value) && isValid(password.value)) {
            signin(data).then(async (responce) => {
                if (responce.status === 200) {
                    const data = await responce.json()
                    localStorage.setItem('token', JSON.stringify(data.token))
                    location.assign('../books.html')
                } else if (responce.status === 400) {
                    console.log('Такой пользователь уже есть');
                }
            })
        } else {
            if (!isValid(username.value)) {
                warningName.style.opacity = 1
                warningName.style.visibility = 'visible'
            }
            if (!isValid(surname.value)) {
                warningSurname.style.opacity = 1
                warningSurname.style.visibility = 'visible'
            }
            if (!isValid(age.value)) {
                warningNum.style.opacity = 1
                warningNum.style.visibility = 'visible'
            }
            if (!isValid(password.value)) {
                warningPassword.style.opacity = 1
                warningPassword.style.visibility = 'visible'
            }
        }
    })
}