import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

interface BookFormData {
  title: string
  author: string
  isbn: string
  publication_year: string
  description: string
  category: string
  available_copies: string
}

interface BookFormProps {
  onSuccess: () => void
}

export default function BookForm({ onSuccess }: BookFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
    publication_year: '',
    description: '',
    category: '',
    available_copies: '1'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('books')
        .insert([{
          ...formData,
          publication_year: parseInt(formData.publication_year),
          available_copies: parseInt(formData.available_copies)
        }])

      if (error) throw error

      // Reset form
      setFormData({
        title: '',
        author: '',
        isbn: '',
        publication_year: '',
        description: '',
        category: '',
        available_copies: '1'
      })

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Biography',
    'History',
    'Science',
    'Technology'
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Add New Book</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            pattern="[0-9]{13}"
            title="Please enter a valid 13-digit ISBN"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Publication Year</label>
          <input
            type="number"
            name="publication_year"
            value={formData.publication_year}
            onChange={handleChange}
            min="1000"
            max={new Date().getFullYear()}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Available Copies</label>
          <input
            type="number"
            name="available_copies"
            value={formData.available_copies}
            onChange={handleChange}
            min="0"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </div>
    </form>
  )
}
