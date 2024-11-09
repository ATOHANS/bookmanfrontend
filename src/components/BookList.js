import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

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
        
        <div className="table-container">
            <h2>Book List</h2>
            <Button variant="success" onClick={() => navigate('/add-book')}>Add New Book</Button>
            <Table striped bordered hover className="mt-3">
                <thead style={{ backgroundColor: 'green', color: 'white' }}>
                    <tr>
                        <th>Title</th>
                        <th>Published Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.published_year}</td>
                            <td>
                                <Button variant="warning" onClick={() => navigate(`/edit-book/${book.id}`)}>Edit</Button>{' '}
                                <Button variant="info" onClick={() => navigate(`/view-book/${book.id}`)}>View</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default BookList;
