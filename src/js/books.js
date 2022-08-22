import { getBooksFromAPI, deleteBookFromAPI, createBook, getBooksItemFromAPI, updateBook, authMe, isFav } from '../api'
import { isValid } from '../utils'
const booksWrapper = document.querySelector(".books-wrapper")

if (document.querySelector('.books')) {
    if (JSON.parse(localStorage.getItem('token'))) {
        const newTitle = document.querySelector('.new-title')
        const newAuthor = document.querySelector('.new-author')
        const newYear = document.querySelector('.new-year')
        const newHouse = document.querySelector('.new-house')
        const newPagesNumber = document.querySelector('.new-pages')
        const newLanguage = document.querySelector('.new-language')

        const updateTitle = document.querySelector('.update-title')
        const updateAuthor = document.querySelector('.update-author')
        const updateYear = document.querySelector('.update-year')
        const updateHouse = document.querySelector('.update-house')
        const updatePagesNumber = document.querySelector('.update-pages')
        const updateLanguage = document.querySelector('.update-language')

        const addBookBtn = document.querySelector('.add-book')
        const close = document.querySelector('.modal-close')
        const modal = document.querySelector('.modal')
        const update = document.querySelector('.update')
        const updateClose = document.querySelector('.update-close')
        const modalForm = document.querySelector('.modal-form')
        const updateForm = document.querySelector('.update-form')
        const logout = document.querySelector('.header-logout')
        const warning = document.querySelectorAll('.modal-item__warning')
        const modalItem = document.querySelectorAll('.modal-item')
        let id = ''


        function open() {
            modal.style.opacity = 1
            modal.style.visibility = 'visible'
        }
        function openUpdate() {
            update.style.opacity = 1
            update.style.visibility = 'visible'
        }
        function closeModal() {
            modalForm.reset()
            modal.style.opacity = 0
            modal.style.visibility = 'hidden'
        }
        function closeUpdate() {
            updateForm.reset()
            update.style.opacity = 0
            update.style.visibility = 'hidden'
        }

        addBookBtn.addEventListener('click', () => {
            open()
        })
        close.addEventListener('click', () => {
            closeModal()
        })
        updateClose.addEventListener('click', () => {
            closeUpdate()
        })

        logout.addEventListener('click', () => {
            localStorage.clear()
            location.reload()
        })

        authMe().then(response => {
            document.querySelector('.user').innerHTML = response.username;
        })

        const getBooks = async () => {
            booksWrapper.innerHTML = ''
            const response = await getBooksFromAPI()
            response.map(item => {
                const template = `
            <div class="books-item">
                <div>
                    <p>${item.name}</p>
                    <h3>${item.author}</h3>
                    ${item.isFavorite ? (`<svg data-index="${item.id}" class='fav' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">  <path data-index="${item.id}" fill="#925837" d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />  </svg>`)
                        : (`<svg data-index="${item.id}" class='fav' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path data-index="${item.id}" fill="#925837" d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" /></svg>`)}
                    <svg data-index="${item.id}" class="del" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path data-index="${item.id}" fill="#925837" d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/>
                    </svg>
                    <svg data-index="${item.id}" class="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path data-index="${item.id}" fill="#925837" d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"/>
                    </svg>
                </div>
            </div>
            `
                booksWrapper.insertAdjacentHTML('afterbegin', template)
            })
        }

        const deleteBook = async () => {
            const del = document.querySelectorAll(".del")
            del.forEach(item => {
                item.addEventListener('click', async (e) => {
                    await deleteBookFromAPI(e.target.dataset.index)
                    await startHandler()
                })
            })
        }

        const openUpdateBtn = async (e) => {
            const edit = document.querySelectorAll(".edit")
            edit.forEach(item => {
                item.addEventListener('click', async (e) => {
                    id = e.target.dataset.index
                    const data = await getBooksItemFromAPI(id)
                    openUpdate()
                    updateTitle.value = data.name,
                        updateAuthor.value = data.author,
                        updateYear.value = data.publishYear,
                        updateHouse.value = data.publishHouse,
                        updatePagesNumber.value = data.pagesNumber,
                        updateLanguage.value = data.originalLanguage
                    const genresUpdate = document.querySelectorAll('.genresUpdate')
                    genresUpdate.forEach(item => {
                        if (data.genres.includes(item.value)) {
                            item.checked = true
                        }
                    })

                    await startHandler()
                })
            })
        }

        const isFavAddEvent = async () => {
            const fav = document.querySelectorAll(".fav")
            fav.forEach(item => {
                item.addEventListener("click", async (e) => {
                    id = e.target.dataset.index
                    let data = await getBooksItemFromAPI(id)
                    data.isFavorite = !data.isFavorite
                    delete data.id
                    await isFav(id, data)
                    await startHandler()
                })
            })
        }

        const startHandler = async () => {
            await getBooks()
            await deleteBook()
            await openUpdateBtn()
            await isFavAddEvent()
        }

        const validateCreate = () => {
            for (let i = 0; i <= modalItem.length - 1; i++) {
                if (modalItem[i].value.trim().length === 0) {
                    warning[i].style.opacity = 1;
                    warning[i].style.visibility = 'visible';

                } else {
                    warning[i].style.opacity = 0;
                    warning[i].style.visibility = 'hidden';
                }
            }
        }

        startHandler()
        const addModalBtn = document.querySelector('.modal-add')
        addModalBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            if (isValid(newTitle.value && newAuthor.value && newYear.value && newHouse.value && newPagesNumber.value && newLanguage.value)) {
                console.log('noo empty');
                const newBook = {
                    name: newTitle.value,
                    author: newAuthor.value,
                    isFavorite: false,
                    publishYear: +newYear.value,
                    publishHouse: newHouse.value,
                    pagesNumber: +newPagesNumber.value,
                    genres: [],
                    originalLanguage: newLanguage.value
                }
                const genres = document.querySelectorAll('.genres')
                console.log(genres);
                genres.forEach(item => {
                    if (item.checked) {
                        newBook.genres.push(item.value)
                    }
                })
                await createBook(newBook)
                await startHandler()
                closeModal()
            } else {
                validateCreate()


                modalItem.forEach((item) => {
                    item.oninput = () => {
                        validateCreate()
                    }
                })
            }
        })


        const updateBtn = document.querySelector('.update-add')
        updateBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            if (isValid(updateTitle.value && updateAuthor.value && updateYear.value && updateHouse.value && updatePagesNumber.value && updateLanguage.value)) {
                const updateData = {
                    name: updateTitle.value,
                    author: updateAuthor.value,
                    isFavorite: false,
                    publishYear: +updateYear.value,
                    publishHouse: updateHouse.value,
                    pagesNumber: +updatePagesNumber.value,
                    genres: [],
                    originalLanguage: updateLanguage.value
                }
                const genresUpdate = document.querySelectorAll('.genresUpdate')
                genresUpdate.forEach(item => {
                    if (item.checked) {
                        updateData.genres.push(item.value)
                    }
                })
                await updateBook(id, updateData)
                await startHandler()
                closeUpdate()
            } else {
                console.log('empty')
            }
        })



        function setWarningText(item) {
            item.style.opacity = 1
            item.style.visibility = 'visible'
        }
        function removeWarningText(item) {
            item.style.opacity = 0
            item.style.visibility = 'hidden'
        }

    } else {
        location.assign('../index.html')
    }
}
