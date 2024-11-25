import {
  renderBookList,
  renderAuthorInfo,
  renderNewUserForm,
  renderNewUser,
} from './render-functions.js';
import {
  getFirstThreeFantasyBooks,
  getAuthor,
  createNewUser,
} from './fetch-functions.js';
/** FEEDBACK: Great job bringing this to completion! */
export default async function app(appDiv) {
  const bookListEl = document.createElement('ul');
  bookListEl.id = 'book-list';
  appDiv.append(bookListEl);

  const authorInfoEl = document.createElement('div');
  authorInfoEl.id = 'author-info';
  appDiv.append(authorInfoEl);

  const newUserEl = document.createElement('div');
  newUserEl.id = 'new-user';
  appDiv.append(newUserEl);

  const newUserFormEl = document.createElement('form');
  newUserFormEl.id = 'new-user-form';
  appDiv.append(newUserFormEl);
  // Render the form!
  // renderNewUserForm;

  // Fetch the books!
  // const books =
  // render out the books
  // renderBookList

  // Fetch the books!
  const books = await getFirstThreeFantasyBooks()
  console.log(books)
  // render out the books
  renderBookList(bookListEl, books) //populates container with data

  bookListEl.addEventListener('click', async (event) => {
    if (event.target.tagName === 'BUTTON') {
      console.log(event)
      const authorId = event.target.dataset.authorUrlKey;

      if (authorId) {
        // Fetch author data
        const authorData = await getAuthor(authorId);
        // Render author data
        if (authorData) {
          await renderAuthorInfo(authorInfoEl, authorData);
        }
      }

    }
  })

  renderNewUserForm(newUserFormEl)
  newUserFormEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userData = new FormData(event.target)
    const formObj = Object.fromEntries(userData)
    const user = await createNewUser(formObj)
    renderNewUser(newUserEl, user)
    // console.log("this is user data: ", userData)
  })


}