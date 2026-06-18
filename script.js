const myLibrary = [];

function Book(title, author, isRead) {
    if(!new.target) {
        throw Error("You must use the 'new' keyword to construct");
    }
    this.id = crypto.randomUUID();
    this.title =  title;
    this.author = author;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, isRead) {
    myLibrary.push(new Book(title, author, isRead));
}

function displayBooks() {
    for(const book of myLibrary) {
        console.log(`ID: ${book.id} | Title: ${book.title} | Author: ${book.author} | isRead: ${book.isRead}`)
    }
}

addBookToLibrary("Dune", "Frank Herbert", false);
addBookToLibrary("Tiki Tembo", "Michelle Obama", true);
addBookToLibrary("Interstellar", "Christopher Nolan", true);

displayBooks();