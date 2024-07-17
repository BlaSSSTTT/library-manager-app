
//fetch delete book
const deleteBookBtn = (e) => {
    fetch(`/book?id=${e.target.dataset.id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id:e.target.dataset.id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        location.href = "/";
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
document.querySelectorAll(".delete-book-btn").forEach(button => {
    button.addEventListener("click", deleteBookBtn);
});
//fill edit module
document.querySelectorAll(".edit-book-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        const cardBody = e.target.closest('.card-body');
        
        const title = cardBody.querySelector('.title').textContent;
        const author = cardBody.querySelector('.author').textContent;
        const description = cardBody.querySelector('.description').textContent;

        document.getElementById("title").value = title || "";
        document.getElementById("author").value = getOptionValueByText(document.getElementById("author"), author) || "";
        document.getElementById("description").value = description || "";
        document.getElementById("id").value = e.target.dataset.id;
    });
});
//fetch update of book
document.getElementById("edit-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    fetch(`/book`, {
        method: 'PATCH',
        body: JSON.stringify({
            title:document.getElementById("title").value,
            author: document.getElementById("author").value,
            description: document.getElementById("description").value,
            id:document.getElementById("id").value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        location.href = "/";
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
})
//function to get id by author name
function getOptionValueByText(selectElement, text) {
    const options = Array.from(selectElement.options);
    const option = options.find(opt => opt.textContent.trim() === text.trim());
    return option ? option.value : "";
}
//fetch get filtered info
document.getElementById("filter-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    let filterName = document.getElementById("filterName").value;
    if(document.getElementById("filter").value==="author"){
        filterName = getOptionValueByText(document.getElementById("author"), document.getElementById("filterName").value)
    }
    fetch(`/book?filter=${document.getElementById("filter").value}&filterName=${filterName}`, {
        method: 'GET'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        updateBookList(data.books);
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
})
const bookList = document.querySelector("#book-list .row")
//function to update book list
function updateBookList(books) {
    bookList.innerHTML = '';

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'col';

        bookCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body" >
                        <h5 class="card-title title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted author">${book.author.name} ${book.author.surname}</h6>
                        <p class="card-text description">${book.description}</p>
                        <button class="btn btn-primary edit-book-btn"  data-bs-toggle="modal" data-bs-target="#editModal" data-id="${book._id}">Edit</button>
                        <button class="btn btn-danger delete-book-btn" data-id="${book._id}">Delete</button>
                    </div>
                </div>
        `;

        const deleteButton = bookCard.querySelector('.delete-book-btn');
        deleteButton.addEventListener('click', deleteBookBtn);
        bookList.appendChild(bookCard);
    });
}