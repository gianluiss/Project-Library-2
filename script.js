const myLibrary = [];

function Book(title, author, genre, status) {
    if(!new.target) {
        throw Error("You must use the 'new' keyword to construct");
    }
    this.id = crypto.randomUUID();
    this.title =  title;
    this.author = author;
    this.genre = genre;
    this.status = status;
}

Book.prototype.toggleStatus = function() {
    this.status = !this.status;
}

function addBookToLibrary(title, author, genre, status) {
    myLibrary.push(new Book(title, author, genre, status));
}

function displayBooks() {
    for(const book of myLibrary) {
        console.log(`ID: ${book.id} | Title: ${book.title} | Author: ${book.author} | Genre: ${book.genre} | status: ${book.status}`)
    }
}

addBookToLibrary("Dune", "Frank Herbert", "Sci-Fi", false);
addBookToLibrary("Tiki Tembo", "Michelle Obama", "Fantasy", true);
addBookToLibrary("Interstellar", "Christopher Nolan", "Sci-Fi", true);
addBookToLibrary("About Time", "Richard Curtis", "Romance", true);



//displayBooks();


const newBook = document.querySelector(".new-book-btn");
const addBookDialog = document.querySelector("#add-book-dialog");
const addBookForm = document.querySelector("#add-book-form");
const dialogClose = document.querySelectorAll(".dialog-close");

const cardGrid = document.querySelector(".card-grid-container");

cardGrid.addEventListener("click", (e) => {
    if(e.target.classList.contains("toggle-btn")) {
        const card = e.target.closest(".card");
        const index = myLibrary.findIndex(book => book.id === card.dataset.id);

        myLibrary[index].toggleStatus();
        displayBooks();
        render();
    }
});

cardGrid.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete-btn")) {
        const card = e.target.closest(".card");
        const index = myLibrary.findIndex(book => book.id === card.dataset.id);

        if(index === -1) 
            return;

        myLibrary.splice(index, 1);
        render();
    }
});

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
    card.dataset.id = book.id;
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
    //status.textContent = `Status: ${book.status ? "Read" : "Unread"}`;

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("card-btn");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("card-btn");
    toggleBtn.classList.add("toggle-btn");

    if(book.status === true) {
        toggleBtn.textContent = "Read";
    }
    else {
        toggleBtn.textContent = "Unread";
    }

    // Append cardFooter children
    cardFooter.appendChild(deleteBtn);
    cardFooter.appendChild(toggleBtn);

    // Append  cardInfo children
    cardInfo.appendChild(title);
    cardInfo.appendChild(author);
    cardInfo.appendChild(genre);
    //cardInfo.appendChild(status);
    cardInfo.appendChild(cardFooter);

    // Append card children
    card.appendChild(img);
    card.appendChild(cardInfo);

    return card;
}

function render() {
    cardGrid.replaceChildren();
    for(let book of myLibrary) {
        cardGrid.appendChild(createCard(book));
    }
}

addBookForm.addEventListener("submit", (e) => {
    console.log("submit fired");
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const genre = document.querySelector("#genre").value;
    const status = document.querySelector('input[name="status"]:checked').value === "true";

    //console.log(`Title: ${title} | Author: ${author} | Genre: ${genre} | Status: ${status}`);
    addBookToLibrary(title, author, genre, status);
    addBookForm.reset();
    addBookDialog.close();

    render();
});

render();