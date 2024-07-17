# library-manager-app
Overview

This web application allows users to manage a library's collection of books and authors. It provides functionalities for adding, editing, deleting books and authors, as well as exporting book data.
Features

    Books Management:
        Add new books with title, author, and description.
        Edit existing book details.
        Delete books (with confirmation).

    Authors Management:
        Add new authors with name and surname.
        Delete authors (with confirmation).

    Export Data:
        Export books data in CSV format.

Technologies Used

    Backend: Node.js, Express.js
    Database: MongoDB
    Frontend: HTML, CSS (Bootstrap), JavaScript (Vanilla)

Installation

To run the application locally:

    Clone the repository:

    bash

git clone <repository-url>
cd <project-folder>

Install dependencies:

npm install

Set up environment variables:

    Create a .env file based on .env.example and configure MongoDB connection details.

Start the server:

sql

    npm start

    Access the application at http://localhost:3000 in your web browser.

Usage

    Managing Books:
        Click on "Books" in the navigation bar to view, add, edit, or delete books.
        Use the "Export Books as JSON" button to download a JSON file of the books data.

    Managing Authors:
        Click on "Authors" in the navigation bar to view, add, or delete authors.
