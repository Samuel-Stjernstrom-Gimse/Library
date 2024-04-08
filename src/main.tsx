import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Books from './components/Books.tsx'
import NotFoundPage from './components/NotFoundPage.tsx'
import Book from './components/Book.tsx'

const router = [
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />
    },
    {
        path: '/books',
        element: <Books />,
        errorElement: <NotFoundPage />
    },
    {
        path: '/books/book/:id',
        element: <Book />
    },
    {
        path: '/404',
        element: <NotFoundPage />
    }
]

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {router.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
