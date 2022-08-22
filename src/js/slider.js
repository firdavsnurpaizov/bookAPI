const upBtn = document.querySelector('.up-button')
const downBtn = document.querySelector('.down-button')
const sidebar = document.querySelector('.sidebar')
const container = document.querySelector('.container-slider')
const mainSlide = document.querySelector('.main-slide')
const signupBtn = document.querySelector('.signup-btn')
const loginBtn = document.querySelector('.login-btn')
const slidesCount = mainSlide?.querySelectorAll('div').length

if (document.querySelector('#main')) {

    let activeSlideIndex = 0;
    sidebar.style.top = `-${(slidesCount - 1) * 100}vh`

    upBtn.addEventListener('click', () => {
        changeSlide('up')
    })

    downBtn.addEventListener('click', () => {
        changeSlide('down')
    })

    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowUp') {
            changeSlide('up')
        } else if (event.key === 'ArrowDown') {
            changeSlide('down')
        }
    })

    function changeSlide(direction) {
        if (direction === 'up') {
            activeSlideIndex++
            if (activeSlideIndex === slidesCount) {
                activeSlideIndex = 0
            }
        } else if (direction === 'down') {
            activeSlideIndex--
            if (activeSlideIndex < 0) {
                activeSlideIndex = slidesCount - 1
            }
        }
        const height = container.clientHeight;
        mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
        sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
    }
}