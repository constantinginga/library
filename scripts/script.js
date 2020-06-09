// TO-DO
// dropdown for status (not read, in progress, finished)
// Add button below to add new book
// when clicked, darken background and show form pop-up
// add animations/transitions
// get inspiration from notion table/tags (for each status add tag design - red, green, yellow backgrounds)
// use bootstrap?



let myLibrary = [];


// book constructor
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = +pages;
    this.status = status;
}


// change reading status of a book
Book.prototype.changeStatus = function() {
    if (this.status === 'Not Read') this.status = 'In Progress';
    else if (this.status === 'In Progress') this.status = 'Finished';
    else if (this.status === 'Finished') this.status = 'Not Read';
}


// add new book object to array
function addBookToLibrary() {
    if (!title.value || !author.value || !pages.value || !isRead.value) return;
    myLibrary.push(new Book(title.value, author.value, pages.value, isRead.options[isRead.selectedIndex].text));
}


// display books in a table
function render() {
    table.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        const bookRow = document.createElement('tr');
        bookRow.dataset.index = i;
        for (key in myLibrary[i]) {
            if (key != 'changeStatus') {
                const bookCell = document.createElement('td');
                bookCell.classList.add(key);
                bookCell.innerHTML = myLibrary[i][key];
                bookRow.appendChild(bookCell);
        }
        }
        table.appendChild(bookRow);
    }
    removeBook();
    updateStatus();
}

// remove selected book from array and re-generate table
function removeBook() {
    const books = document.querySelectorAll('.title');
    books.forEach((book, i) => {
        book.addEventListener('click', e => {
            if (confirm('Remove book?')) {
                myLibrary.splice(i, 1);
                render();
            }
        });
    });
}


// update reading status of a book
function updateStatus() {
    let readingStatus = document.querySelectorAll('.status');
    readingStatus.forEach((status, i) => {
        status.addEventListener('click', e => {
            myLibrary[i].changeStatus();
            status.innerHTML = myLibrary[i].status;
        })
    })
}

// temp values
myLibrary.push(new Book('random title 1', 'random author', '234', 'finished'));
myLibrary.push(new Book('random title 2', 'random author', '234', "in-progress"));
myLibrary.push(new Book('random title 3', 'random author', '234', 'not-read'));
myLibrary.push(new Book('random title 4', 'random author', '234', 'finished'));
myLibrary.push(new Book('random title 5', 'random author', '234', 'not-read'));

const form = document.querySelector('#form');
const btn = document.querySelector('#btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const isRead = document.querySelector('#status');
const table = document.querySelector('#table');


btn.addEventListener('click', e => {
    addBookToLibrary();
    render();
    console.log(isRead.options[isRead.selectedIndex].text);
})


// prevent page reload on form submit
form.addEventListener('submit', e => {
    e.preventDefault();
})



