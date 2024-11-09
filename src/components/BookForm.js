import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const BookForm = ({ mode }) => {
    const [book, setBook] = useState({ title: '', author: '', published_year: '', genre: '', description: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (mode === 'edit' && id) {
            fetch(`http://127.0.0.1:8000/api/books/${id}`)
                .then((response) => response.json())
                .then((data) => setBook(data));
        }
    }, [mode, id]);

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = mode === 'edit' ? 'PUT' : 'POST';
        const url = mode === 'edit' ? `http://127.0.0.1:8000/api/books/${id}` : 'http://127.0.0.1:8000/api/books';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        }).then(() => {
            navigate('/'); 
        });
    };

    return (
        <div>
            <h2>{mode === 'edit' ? 'Edit Book' : 'Add New Book'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={book.title} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" name="author" value={book.author} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Published Year</Form.Label>
                    <Form.Control type="number" name="published_year" value={book.published_year} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" name="genre" value={book.genre} onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={book.description} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">{mode === 'edit' ? 'Update Book' : 'Add Book'}</Button>
            </Form>
        </div>
    );
};

export default BookForm;