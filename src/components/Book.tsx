import { Params, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Author, BookMetadata } from '../assets/types/types'

const Book = () => {
    const { id } = useParams<Params>()
    const [book, setBook] = useState<BookMetadata | null>(null)
    const [reading, setReading] = useState<boolean>(false)

    useEffect(() => {
        const getData = async (): Promise<void> => {
            try {
                const result: Response = await fetch(`https://gutendex.com/books/${id}`)
                const data: BookMetadata = await result.json()
                setBook(data)
                console.log(data)
            } catch (error) {
                console.error('Error fetching book:', error)
            }
        }

        getData()
    }, [id])

    const getCoverImageUrl = (): string | null => {
        return book?.formats['image/jpeg'] ?? ''
    }

    const getBookText = (): string | null => {
        return book?.formats['text/html'] ?? ''
    }

    const handleReading = () => {
        setReading((prevState) => !prevState)
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh'
            }}
        >
            <h1>{book?.title}</h1>
            {book?.authors.map((auth: Author, index: number) => <h3 key={index}>{auth.name}</h3>)}
            {getCoverImageUrl() && <img style={{}} src={getCoverImageUrl()} alt="" />}

            <button onClick={handleReading}>Read</button>
            <div
                style={{
                    position: 'absolute',
                    top: '5vh',
                    backgroundColor: 'rgb(232,232,232)',
                    display: reading ? 'block' : 'none'
                }}
            >
                <button onClick={handleReading} style={{ position: 'absolute', right: 0 }}>
                    X
                </button>

                {getBookText() && (
                    <iframe
                        title="Book Content"
                        style={{
                            border: '2px solid gray',
                            zIndex: '1',
                            overflow: 'hidden',
                            width: '80vw',
                            height: '90vh'
                        }}
                        src={getBookText()!} // Use non-null assertion operator (!) since getBookText() will return string | null
                    />
                )}
            </div>
        </div>
    )
}

export default Book
