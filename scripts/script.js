// TO-DO
// when clicked, darken background and show form pop-up
// add animations/transitions to table, modal
// choose font
// customize table and modal
// hide modal after adding book

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


function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}


// add new book object to array
function addBookToLibrary() {
    if (!title.value || !author.value || !pages.value || !isRead.value) return;
    myLibrary.push(new Book(title.value, author.value, pages.value, isRead.options[isRead.selectedIndex].text));

}


// display books in a table
function render() {
    table.innerHTML = '';
    if (myLibrary.length != 0) generateTableHead();
    const tbody = document.createElement('tbody');
    for (let i = 0; i < myLibrary.length; i++) {
        const bookRow = document.createElement('tr');
        bookRow.dataset.index = i;
        for (key in myLibrary[i]) {
            if (key != 'changeStatus') {
                const bookCell = document.createElement('td');
                bookCell.classList.add(key);
                (key === 'status') ? bookCell.innerHTML = `<span class="btn ${assignColor(myLibrary[i][key])}">${myLibrary[i][key]}</span>`
                : bookCell.innerHTML = myLibrary[i][key];
                bookRow.appendChild(bookCell);
            }
        }
        tbody.appendChild(bookRow);
    }
    table.append(tbody);
    removeBook();
    updateStatus();
}

// remove selected book from array and re-generate table
function removeBook() {
    const books = document.querySelectorAll('.title');
    books.forEach((book, i) => {
        book.addEventListener('click', e => {
            if (confirm(`Remove "${book.innerHTML}"?`)) {
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
            status.innerHTML = `<span class="btn ${assignColor(myLibrary[i].status)}">${myLibrary[i].status}</span>`;
        })
    })
}

// temp values
myLibrary.push(new Book('random title 1', 'random author', '234', 'finished'));
myLibrary.push(new Book('random title 2', 'random author', '234', "in-progress"));
myLibrary.push(new Book('random title 3', 'random author', '234', 'not-read'));
myLibrary.push(new Book('random title 4', 'random author', '234', 'finished'));
myLibrary.push(new Book('random title 5', 'random author', '234', 'not-read'));

const newBtn = document.querySelector('#new');
const form = document.querySelector('#form');
const btn = document.querySelector('#btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const isRead = document.querySelector('#status');
const table = document.querySelector('#table');
const formModal = document.querySelector('#form-modal');
const close = document.querySelector('#close');

newBtn.addEventListener('click', () => formModal.style.display = 'block')

close.addEventListener('click', () => formModal.style.display = 'none')

window.addEventListener('click', hideModal);

btn.addEventListener('click', () => {
    addBookToLibrary();
    render();
})


// prevent page reload on form submit
form.addEventListener('submit', e => {
    e.preventDefault();
})


function generateTableHead() {
    const thead = document.createElement('thead');
    thead.classList.add('thead-light');
    const tr = document.createElement('tr');
    const bookInfo = [title.id, author.id, pages.id, isRead.id];
    for (let i = 0; i < bookInfo.length; i++) {
        const th = document.createElement('th');
        th.innerHTML = capitalize(bookInfo[i]);
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
}


function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}


// return bootstrap class according to book status
function assignColor(status) {
    if (status.includes('Not')) return 'btn-danger';
    else if (status.includes('Progress')) return 'btn-info';
    return 'btn-success';
}

function hideModal(e) {
    if (e.target == formModal) formModal.style.display = 'none';
}

