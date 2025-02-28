import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import BookForm from './BookForm'

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  publication_year: number
  description: string
  category: string
  available_copies: number
}

export default function SupabaseExample() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [showForm, setShowForm] = useState(false)

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('title')
      
      if (error) throw error
      
      setBooks(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleAddBookSuccess = () => {
    fetchBooks()
    setShowForm(false)
  }

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Library Books</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {showForm ? 'Hide Form' : 'Add New Book'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <BookForm onSuccess={handleAddBookSuccess} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
            <p className="text-sm text-gray-500">Published: {book.publication_year}</p>
            <p className="text-sm text-gray-500">Category: {book.category}</p>
            {book.description && (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{book.description}</p>
            )}
            <p className="mt-2 text-sm font-medium">
              Available Copies: <span className={book.available_copies > 0 ? 'text-green-600' : 'text-red-600'}>
                {book.available_copies}
              </span>
            </p>
          </div>
        ))}
      </div>

      {books.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-8">No books found. Add some books to get started!</p>
      )}
    </div>
  )
}
