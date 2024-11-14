export const getFirstThreeFantasyBooks = async () => {
    //first, fetch the data from the right url 
    try {
        //storing url in a variable inside of the fetch function  
        const bookUrl = 'https://openlibrary.org/subjects/fantasy.json'
        //fetching data using the arguments from fetchHandler
        const response = await fetch(bookUrl);

        //checking if the fetch promise is settled properly
        if (!response.ok) {
            //if it didn't throw the expected error message
            throw new Error(`Failed to get fantasy books`)
        }

        //response type check function 
        const isJson = (response.headers.get('content-type') || '').includes('application/json')

        //getting data by checking if the response is json first, then translating it into JS
        let bookData = isJson ? await response.json() : await response.text()

        //logging the data in the console
        console.log(bookData)

        //returning the data in the format that the tests required. 3 fantasy books, with the title, author, url key, and book cover url.
        //getting only the first three books from the works array inside data, and formatting each one 
        return bookData.works.slice(0, 3).map((work) => {
            //why return inside of a return?
            return {
                //for each work get the work title
                title: work.title,
                //get the work author info
                author: {
                    //author name, the first one specifically if there are multiple
                    name: work.authors[0].name,
                    //the url key of the author so users can go to the author's page to see their other works
                    urlKey: work.authors[0].key,
                },

                //the cover of the book 
                coverUrl: `https://covers.openlibrary.org/a/id/${work.cover_id}-M.jpg`

            }
        });

    } catch (error) {
        //console logs the mock error message "Network Error"
        console.warn(error.message);
        return null
    }




};


//always make sure that they're async since you're returning promises 
//the url key is fed to the button when rendering each book, by fetching the urlkey for the author of the book. It's then set as an attribute for the button below the book cover when the book is rendered.
//when the button is pressed, this function will run, taking the urlKey it's fed as an argument from the individual book element
export const getAuthor = async (urlKey) => {

    try {
        //since the test case is formatted weird you have to kind of ommit the /authors/ part. Which is dumb. 
        const authorUrl = `https://openlibrary.org${urlKey}.json`
        //fetching data using the arguments from fetchHandler
        const response = await fetch(authorUrl);

        //checking if the fetch promise is settled properly
        if (!response.ok) {
            throw new Error(`Failed to get author`)
        }

        //response type check function 
        const isJson = (response.headers.get('content-type') || '').includes('application/json')

        //getting data by checking if the response is json first, then translating it into JS
        let authorData = isJson ? await response.json() : await response.text()

        //logging the data in the console
        console.log(authorData)

        //returning the data 
        return {
            //personally I think it should be formatted picture, name, birthday, bio, wikilink but whatever it's just the raw data
            birthDate: authorData.birth_date,
            bio: authorData.bio,
            wikipediaUrl: authorData.wikipedia,
            name: authorData.personal_name,
            pictureUrl: `https://covers.openlibrary.org/a/id/${authorData.photos[0]}-M.jpg`
        };

    } catch (error) {
        console.warn(error.message);

        return null
    }


};

export const createNewUser = () => {
}