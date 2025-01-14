// Book Class : Represemts a book
class Book {
    constructor(title,author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}


// UU Class
class UI {
    static displayBooks() {
        const books = Storage.getBooks();

        books.forEach((book)=> UI.addBookToList(book))
    }

   
    

    static addBookToList(book) {
     const list = document.querySelector('#book-list')

      const row = document.createElement('tr')
      
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      
      `;
      list.appendChild(row)
    }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message,className) {
    const div = document.createElement('div')
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form');
    container.insertBefore(div,form)


    // Vanish in 3 Seconds
    setTimeout(()=> document.querySelector('.alert').remove(),3000)

  }
  
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

 // Storage Class : Handle Storage
 class Storage {
    static getBooks() {
        let books;
        if(localStorage.getItem('books')=== null) {
            books = [];
        }else {
            books= JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    
    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books =Storage.getBooks();
        books.forEach((book,index)=> {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }

        })
        localStorage.setItem('books',JSON.stringify(books))

    }
 }


// Event: Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks)


// Event : Add Book 
document.querySelector('#book-form').addEventListener('submit',(e)=> {
    // Default action
    e.preventDefault();

    // Get Form Values
  const title =  document.querySelector('#title').value;
  const author =  document.querySelector('#author').value;
  const isbn =  document.querySelector('#isbn').value;
  // Validate All Fields
  if(title === '' || author === '' || isbn === '' ) {
    UI.showAlert('Please fill in all fields','danger')
  }else {
    // Instantiate Book
  const book = new Book(title,author,isbn);
  

  // Add Book to UI
  UI.addBookToList(book);

  // Add Book to Storage
  Storage.addBook(book);

  // Show Success Message
  UI.showAlert('Book Added','success')

  // Clear Fields
  UI.clearFields();
  }
  

  
})

// Delete Book
document.querySelector('#book-list').addEventListener('click',(e)=> {

    // Remove Book from UI
    UI.deleteBook(e.target)


    // Remove Book from Storage 
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent)


    // Book Removed Message
    UI.showAlert('Book Removed','info')
})