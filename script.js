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

const cardGrid = document.querySelector(".card-grid-container");

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

function createCard(book) {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.classList.add("card-img");
    img.src = "./placeholder-pic.jpg";

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
    
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const genre = document.createElement("p");
    const status = document.createElement("p");

    title.textContent = book.title;
    author.textContent = "by " + book.author;
    genre.textContent = book.genre;
    status.textContent = `Status: ${book.status === "true" ? "Read" : "Unread"}`;

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("card-btn");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    const editBtn = document.createElement("button");
    editBtn.classList.add("card-btn");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";

    // Append cardFooter children
    cardFooter.appendChild(deleteBtn);
    cardFooter.appendChild(editBtn);

    // Append  cardInfo children
    cardInfo.appendChild(title);
    cardInfo.appendChild(author);
    cardInfo.appendChild(genre);
    cardInfo.appendChild(status);
    cardInfo.appendChild(cardFooter);

    // Append card children
    card.appendChild(img);
    card.appendChild(cardInfo);

    return card;
}

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

    //console.log(myLibrary[myLibrary.length - 1]);

    //Might change this soon since appending card to grid might be separate from submitting
    cardGrid.appendChild(createCard(myLibrary[myLibrary.length - 1]));

    //console.log(myLibrary);
});
