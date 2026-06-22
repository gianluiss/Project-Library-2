const myLibrary = [];

function Book(title, author, genre, isRead) {
    if(!new.target) {
        throw Error("You must use the 'new' keyword to construct");
    }
    this.id = crypto.randomUUID();
    this.title =  title;
    this.author = author;
    this.genre = genre;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, genre, isRead) {
    myLibrary.push(new Book(title, author, genre, isRead));
}

function displayBooks() {
    for(const book of myLibrary) {
        console.log(`ID: ${book.id} | Title: ${book.title} | Author: ${book.author} | Genre: ${book.genre} | isRead: ${book.isRead}`)
    }
}

/*
addBookToLibrary("Dune", "Frank Herbert", "Sci-Fi", false);
addBookToLibrary("Tiki Tembo", "Michelle Obama", "Fantasy", true);
addBookToLibrary("Interstellar", "Christopher Nolan", "Sci-Fi", true);

displayBooks();
*/

const newBook = document.querySelector(".new-book-btn");
const addBookDialog = document.querySelector("#add-book-dialog");
const addBookForm = document.querySelector("#add-book-form");

const dialogClose = document.querySelectorAll(".dialog-close");

dialogClose.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const dialog = e.target.closest("dialog");
        const form = dialog.querySelector("form");

        ///console.log(form, dialog);
        form.reset();
        dialog.close();
    });
});

newBook.addEventListener("click", () => {
    addBookDialog.showModal();
});

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const genre = document.querySelector("#genre").value;
    const status = document.querySelector('input[name="status"]:checked').value;

    //console.log(`Title: ${title} | Author: ${author} | Genre: ${genre} | Status: ${status}`);
    addBookToLibrary(title, author, genre, status);
    addBookForm.reset();
    addBookDialog.close();
    console.log(myLibrary);
});