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

//////////////////////////////////////////////


function Book (title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
}

//////////////////////////////////////////////


function addBookToLibrary(evt) {

    evt.preventDefault();
    
    title = titleInput.value; 
    author = authorInput.value;
    pages = parseInt(pagesInput.value);
    read = readInput.checked;

    let index = myLybrary.length;
    let newBook = new Book(title, author, pages, read, index);
    myLybrary[index] = newBook;

    addLibraryEntry(title, author, pages, read);

    addBookDialog.close();

}

function addLibraryEntry(title, author, pages, read) {

    let newLibraryEntry = document.createElement("div");
    newLibraryEntry.setAttribute("class", "library-entry");

    let newLibEntryInfo = document.createElement("div");
    newLibEntryInfo.setAttribute("class", "library-entry-info");

    let newTitle = document.createElement("div");
    newTitle.innerText = "Title: " + title;

    let newAuthor = document.createElement("div");
    newAuthor.innerText = "Author: " + author;

    let newPages = document.createElement("div");
    newPages.innerText = "Pages: " + pages;

    let newRead = document.createElement("div");
    newRead.innerText = read ? "Read" : "Not read";

    newLibEntryInfo.appendChild(newTitle);
    newLibEntryInfo.appendChild(newAuthor);
    newLibEntryInfo.appendChild(newPages);
    newLibEntryInfo.appendChild(newRead);

    newLibraryEntry.appendChild(newLibEntryInfo);

    library.appendChild(newLibraryEntry);

}