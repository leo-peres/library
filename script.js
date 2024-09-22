const addBook = document.querySelector(".add-book");
const addBookDialog = document.querySelector(".add-book-dialog");
const confirmBtn = document.querySelector(".confirm-btn");
const cancelBtn = document.querySelector(".cancel-btn");

addBook.addEventListener("click", () => {
    addBookDialog.showModal();
});

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

confirmBtn.addEventListener("click", addBookToLibrary);

cancelBtn.addEventListener("click", () => {
    addBookDialog.close();
})

const library = document.querySelector(".library-div");

//////////////////////////////////////////////

const myLybrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(evt) {

    evt.preventDefault();
    
    let newLibraryEntry = document.createElement("div");

    let newTitle = document.createElement("p");
    newTitle.innerText = "Title: " + titleInput.value;

    let newAuthor = document.createElement("p");
    newAuthor.innerText = "Author: " + authorInput.value;

    let newPages = document.createElement("p");
    newPages.innerText = "Pages: " + pagesInput.value;

    let newRead = document.createElement("p");
    newRead.innerText = readInput.checked ? "Read" : "Not read"

    newLibraryEntry.appendChild(newTitle);
    newLibraryEntry.appendChild(newAuthor);
    newLibraryEntry.appendChild(newPages);
    newLibraryEntry.appendChild(newRead);

    library.appendChild(newLibraryEntry);

    addBookDialog.close();

}

