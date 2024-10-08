const body = document.querySelector("body");

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

const fullTextContainer = document.querySelector(".full-text-container");

//////////////////////////////////////////////

const myLibrary = [];

let timeoutId;
let fullTextDisplaying = false;

//////////////////////////////////////////////

class Book {

    constructor(title, author, pages, read, index) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = index;
    }

    decrementIndex() {this.index--;}
    toggleRead() {this.read = !this.read;}

}

//////////////////////////////////////////////


function addBookToLibrary(evt) {

    evt.preventDefault();
    
    title = titleInput.value; 
    author = authorInput.value;
    pages = parseInt(pagesInput.value);
    read = readInput.checked;

    let index = myLibrary.length;
    let newBook = new Book(title, author, pages, read, index);
    myLibrary[index] = newBook;

    addLibraryEntry(newBook);

    addBookDialog.close();

}

function addLibraryEntry(newBook) {

    let newLibraryEntry = document.createElement("div");
    newLibraryEntry.classList.add("library-entry");
    newLibraryEntry.setAttribute("index", newBook.index);

    let newLibEntryInfo = document.createElement("div");
    newLibEntryInfo.setAttribute("class", "library-entry-info");

    let newTitle = document.createElement("div");
    let titleBold = document.createElement("b");
    titleBold.innerText = "Title: ";
    newTitle.appendChild(titleBold);
    newTitle.append(newBook.title);
    newTitle.addEventListener("mouseenter", showFullTextEnter);
    newTitle.addEventListener("mouseleave", showFullTextLeave);
    newTitle.addEventListener("mousemove", showFullText);

    let newAuthor = document.createElement("div");
    let authorBold = document.createElement("b");
    authorBold.innerText = "Author: "
    newAuthor.appendChild(authorBold);
    newAuthor.append(newBook.author);

    let newPages = document.createElement("div");
    let pagesBold = document.createElement("b");
    pagesBold.innerText = "Nº of pages: ";
    newPages.appendChild(pagesBold);
    newPages.append(newBook.pages);

    let newRead = document.createElement("div");
    if(newBook.read)
        newLibraryEntry.setAttribute("read", "");

    newLibEntryInfo.appendChild(newTitle);
    newLibEntryInfo.appendChild(newAuthor);
    newLibEntryInfo.appendChild(newPages);
    newLibEntryInfo.appendChild(newRead);

    newLibraryEntry.appendChild(newLibEntryInfo);

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("library-entry-remove-btn");
    removeBtn.addEventListener("click", removeBook);
    newLibraryEntry.appendChild(removeBtn);

    let toggleReadBtn = document.createElement("button");
    toggleReadBtn.classList.add("library-entry-toggle-read-btn");
    toggleReadBtn.addEventListener("click", toggleRead);

    let toggleReadSpan = document.createElement("span");
    toggleReadBtn.appendChild(toggleReadSpan);

    newLibraryEntry.appendChild(toggleReadBtn);

    library.appendChild(newLibraryEntry);

}

function removeBook(evt) {

    let libraryEntry = evt.target.parentElement;
    let index = parseInt(libraryEntry.getAttribute("index"));

    myLibrary.splice(index, 1);
    for(let i = index; i < myLibrary.length; i++)
        decrementIndex(i + 1);

    libraryEntry.remove();

}

function decrementIndex(index) {

    let libraryEntry = document.querySelector(`.library-entry[index="${index}"]`);
    let book = myLibrary[index - 1];

    libraryEntry.setAttribute("index", index - 1);
    book.decrementIndex();

}

function toggleRead(evt) {

    let libraryEntry = evt.target.parentElement;
    let index = parseInt(libraryEntry.getAttribute("index"));

    if(libraryEntry.hasAttribute("read"))
        libraryEntry.removeAttribute("read");
    else
        libraryEntry.setAttribute("read", "");

    myLibrary[index].toggleRead();

}

//////////////////////////////////////////////

function showFullTextEnter() {
    clearTimeout(timeoutId);
}

function showFullTextLeave() {
    clearTimeout(timeoutId);
    hideFullText();
}

function showFullText(evt) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(showFullTextAux, 500, evt);
}

function showFullTextAux(evt) {

    if(!fullTextDisplaying) {

        target = evt.target;

        text = target.innerText;
        text = text.split(/: (.*)/s).splice(1).join('');

        mouseX = evt.x;
        mouseY = evt.y;

        fullTextContainer.innerText = text;
        fullTextContainer.style.display = "block";
        fullTextContainer.style.left = String(mouseX) + "px";
        fullTextContainer.style.top = String(mouseY + 12) + "px";

        fullTextDisplaying = true;

    }

}

function hideFullText() {
    fullTextContainer.innerText = "";
    fullTextContainer.style.display = "none";
    fullTextDisplaying = false;
}