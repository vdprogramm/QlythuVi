const API_URL = '/api/books';

function loadBooks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(displayBooks)
    .catch(console.error);
}

function displayBooks(books) {
  const list = document.getElementById('book-list');
  list.innerHTML = '';
  books.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book-item';
    div.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} (${book.year})
      <div class="actions">
        <button onclick="editBook(${book.id}, '${book.title}', '${book.author}', ${book.year})">Edit</button>
        <button class="delete" onclick="deleteBook(${book.id})">Delete</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function deleteBook(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => loadBooks())
    .catch(console.error);
}

document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const book = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    year: parseInt(document.getElementById('year').value)
  };

  const bookId = document.getElementById('book-id').value;

  if (bookId) {
    // UPDATE
    fetch(`${API_URL}/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
      .then(() => {
        resetForm();
        loadBooks();
      })
      .catch(console.error);
  } else {
    // CREATE
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
      .then(() => {
        this.reset();
        loadBooks();
      })
      .catch(console.error);
  }
});

function editBook(id, title, author, year) {
  document.getElementById('book-id').value = id;
  document.getElementById('title').value = title;
  document.getElementById('author').value = author;
  document.getElementById('year').value = year;
  document.getElementById('cancel-update').style.display = 'inline-block';
}

function resetForm() {
  document.getElementById('book-form').reset();
  document.getElementById('book-id').value = '';
  document.getElementById('cancel-update').style.display = 'none';
}

document.getElementById('cancel-update').addEventListener('click', resetForm);

function searchBooks() {
  const keyword = document.getElementById('search-input').value.trim();
  if (keyword) {
    fetch(`${API_URL}/search?keyword=${encodeURIComponent(keyword)}`)
      .then(res => res.json())
      .then(displayBooks)
      .catch(console.error);
  }
}

window.onload = loadBooks;
