import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Books = () => {
    const [books, setBooks] = useState<object[]>([])
    const [page, setPage] = useState<number>(1)

    useEffect((): void => {
        getData().then()
    }, [page])

    const getData = async (): Promise<void> => {
        try {
            const result: Response = await fetch(`https://gutendex.com/books/?page=${page}`)
            const data = await result.json()
            setBooks(data.results)
            console.log(data.results)
        } catch (error) {
            console.log('error')
        }
    }

    const handlePageChange = (operator: string): void => {
        operator === '+' ? setPage(page + 1) : setPage(page - 1)
    }

    return (
        <div>
            <button onClick={() => handlePageChange('-')}> prev page</button>
            <button onClick={() => handlePageChange('+')}> next page</button>
            {books.map((book: object) => {
                return (
                    <div>
                        <Link to={`/books/book/${book.id}`}>{book.title}</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Books
