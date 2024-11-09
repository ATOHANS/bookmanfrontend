// src/pages/ViewBook.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/books/${id}`)
            .then(response => response.json())
            .then(data => setBook(data));
    }, [id]);

    return (
        <div>
            <h2>View Book</h2>
            {book && (
                <div>
                    {/* Display book details */}
                </div>
            )}
        </div>
    );
};

export default ViewBook;
