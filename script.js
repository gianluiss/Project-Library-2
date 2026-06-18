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

addBookToLibrary("Dune", "Frank Herbert", "Sci-Fi", false);
addBookToLibrary("Tiki Tembo", "Michelle Obama", "Fantasy", true);
addBookToLibrary("Interstellar", "Christopher Nolan", "Sci-Fi", true);

displayBooks();