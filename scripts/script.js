let myLibrary = [];


class Book {

    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = +pages;
        this.status = status;
    }

    changeStatus() {
        if (this.status === 'Not Read') this.status = 'In Progress';
        else if (this.status === 'In Progress') this.status = 'Finished';
        else if (this.status === 'Finished') this.status = 'Not Read';
    }
}


function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}


// add new book object to array
function addBookToLibrary() {
    if (!title.value || !author.value || !pages.value || !isRead.value) {
        form.classList.add('was-validated');
        return;
    }
    myLibrary.push(new Book(title.value, author.value, pages.value, isRead.options[isRead.selectedIndex].text));
    populateStorage();
    formModal.style.display = 'none';
}


// display books in a table
function render() {
    table.innerHTML = '';
    if (myLibrary.length != 0) {
        generateTableHead();
        table.classList.add('fade-in');
    } else table.classList.remove('fade-in');
    const tbody = document.createElement('tbody');
    for (let i = 0; i < myLibrary.length; i++) {
        const bookRow = document.createElement('tr');
        bookRow.dataset.index = i;
        for (key in myLibrary[i]) {
            // don't add function to table
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


// remove selected book from array and re-render table
function removeBook() {
    const books = document.querySelectorAll('.title');
    books.forEach((book, i) => {
        book.addEventListener('click', e => {
            if (confirm(`Remove "${book.innerHTML}"?`)) {
                myLibrary.splice(i, 1);
                render();
                populateStorage();
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
            populateStorage();
        });
    });
}


const newBtn = document.querySelector('#new'),
    form = document.querySelector('#form'),
    btn = document.querySelector('#btn'),
    title = document.querySelector('#title'),
    author = document.querySelector('#author'),
    pages = document.querySelector('#pages'),
    isRead = document.querySelector('#status'),
    table = document.querySelector('#table'),
    formModal = document.querySelector('#form-modal'),
    close = document.querySelector('#close');


// show modal for adding a new book
newBtn.addEventListener('click', () => {
    formModal.style.display = 'block';
    formModal.classList.add('fade-in');
    resetForm();
});


close.addEventListener('click', () => formModal.style.display = 'none');
window.addEventListener('click', hideModal);


// add new book to array and table
btn.addEventListener('click', () => {
    addBookToLibrary();
    render();
});


// prevent page reload on form submit
form.addEventListener('submit', e => {
    e.preventDefault();
});


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
    if (e.target == formModal) {
        formModal.style.display = 'none';
        formModal.classList.remove('fade-in');
    }
}


function resetForm() {
    form.classList.remove('was-validated');
    title.value = author.value = pages.value = isRead.value =  '';
}


// store books in local Storage
function populateStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}


// parse string into array of objects and copy the prototype over
function retrieveStorage() {
    myLibrary = JSON.parse(localStorage.getItem('library'));
    myLibrary.forEach(book => book.__proto__ = Book.prototype);
}

(!localStorage.getItem('library')) ? populateStorage() : (retrieveStorage(), render());