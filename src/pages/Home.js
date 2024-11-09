// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/books');
        const data = await response.json();
        setBooks(data);
    };

    const handleDelete = async (id) => {
        await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
            method: 'DELETE',
        });
        fetchBooks();
    };

    return (
        <div>
            <h2>Book List</h2>
            <Link to="/add-book">
                <Button variant="success">Add New Book</Button>
            </Link>
            <Table striped bordered hover className="mt-3" style={{ border: '2px solid green' }}>
                <thead style={{ backgroundColor: 'green', color: 'white' }}>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published Year</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.published_year}</td>
                            <td>{book.genre}</td>
                            <td>
                                <Link to={`/edit-book/${book.id}`}>
                                    <Button variant="warning">Edit</Button>
                                </Link>{' '}
                                <Link to={`/view-book/${book.id}`}>
                                    <Button variant="info">View</Button>
                                </Link>{' '}
                                <Button variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Home;
