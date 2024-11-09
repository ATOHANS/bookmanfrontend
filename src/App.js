// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
import './App.css';
const App = () => {
    return (
        <Router>
            <div>
                <h1 className="text-start">Book Management System</h1>
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/add-book" element={<BookForm mode="add" />} />
                    <Route path="/edit-book/:id" element={<BookForm mode="edit" />} />
                    <Route path="/view-book/:id" element={<BookDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
