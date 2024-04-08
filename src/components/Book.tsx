import { Params, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Book = () => {
    const bookId: Readonly<Params<string>> = useParams()
    const [book, setBook] = useState<object>([])
    const [reading, setReading] = useState<boolean>(true)

    useEffect((): void => {
        getData().then()
    }, [])

    const getData = async (): Promise<void> => {
        try {
            const result: Response = await fetch(`https://gutendex.com/books/${bookId.id}`)
            const data = await result.json()
            setBook(data)
            console.log(data)
            console.log(bookId)
        } catch (error) {
            console.log('error')
        }
    }

    const getCoverImageUrl = () => {
        if (!book || !book.formats) return null
        const imageFormat = book.formats['image/jpeg']
        if (imageFormat) {
            return imageFormat
        }
    }

    const getBookText = () => {
        if (!book || !book.formats) return null
        const textFormat = book.formats['text/html']
        if (textFormat) {
            return textFormat
        }
    }

    const handleReading = () => {
        setReading((prevState) => !prevState)
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '2rem'
                }}
            >
                <h1>{book.title}</h1>
                <img style={{}} src={getCoverImageUrl()} alt="" />
                <div>{getBookText()}</div>
                <button onClick={handleReading}>Reading</button>
                <iframe
                    style={{
                        border: '2px solid gray',
                        overflow: 'hidden',
                        width: '80vw',
                        height: '90vh',
                        position: 'absolute',
                        top: '5vh',
                        display: reading ? 'visible' : 'none'
                    }}
                    src={getBookText()}
                />
            </div>
        </>
    )
}

export default Book
