export const renderBookList = (bookListEl, books) => {

    //make sure that there are no existing children inside the booklist element
    bookListEl.innerHTMl = "";


    books.forEach((book) => {
        //creating the li element and storing it in a variable
        const li = document.createElement('li')

        //creating the img element and storing it in a variable
        const img = document.createElement('img')
        //adding attributes to img such as the src url that links to the book cover
        img.src = book.coverUrl;
        //adding an attribute alt text 
        img.alt = `An old cover of ${book.title}`


        //creating the p element and storing it in a variable
        const p = document.createElement('p')
        //adding the textcontext attribute 
        p.textContent = `Title: ${book.title}`

        //creating the button element and storing it in a variable
        const button = document.createElement('button')
        //adding text to the button via attribute
        button.textContent = `View ${book.author.name}`
        //linking the author's url to the button using the setAttribute method 
        button.setAttribute('data-author-url-key', book.author.urlKey)

        //appending all the displayed data in the book element to the list item element 
        li.append(img, p, button)
        //appending the list item element to the parent element "bookListEl"
        bookListEl.append(li)
    })

}

export const renderAuthorInfo = (authorInfoEl, author) => {
    //clearing the element of any previous children before rendering a new author
    authorInfoEl.innerHTMl = "";

    const h2 = document.createElement('h2')
    h2.textContent = `${author.name}`

    const img = document.createElement('img')
    img.src = author.pictureUrl
    img.alt = `A picture of ${author.name}`

    const birthday = document.createElement('p')
    birthday.textContent = `Born: ${author.birthDate}`

    const bio = document.createElement('p')
    bio.textContent = `${author.bio}`

    const wikiLink = document.createElement('a')
    wikiLink.textContent = "Wikipedia Link"
    wikiLink.href = author.wikipediaUrl


    authorInfoEl.append(h2, birthday, bio, img, wikiLink)
}


export const renderNewUserForm = (newUserFormEl) => {
    newUserFormEl.innerHTML = `
    <label for="username">Username</label>
    <input id="username" name="username" type="text"></input>
    <label for="is-cool">Is this user cool?</label>
    <input id="is-cool" name="isCool" type="checkbox"></input>
    <label for="favorite-language">Favorite Language</label>
    <select id="favorite-language" name="favoriteLanguage">
        <option value="None">None</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Ruby">Ruby</option>
    </select>
    <button>Create User</button>`

}

export const renderNewUser = (newUserEl, newUser) => {
    newUserEl.innerHTMl = ''

    const username = document.createElement('h2')
    //creating the dataset attribute and naming it userID, giving it the value of the new user's id
    username.textContent = newUser.username
    //don't make this a string. oops.
    username.dataset.userId = newUser.id

    const isCoolConRender = document.createElement('p')

    if (newUser.isCool) {
        isCoolConRender.textContent = "The hippest in the house!"
    } else {
        isCoolConRender.textContent = "A real square."
    }


    const favLang = document.createElement('p')
    favLang.textContent = `Favorite Language: ${newUser.favoriteLanguage}`

    newUserEl.append(username, isCoolConRender, favLang)
}