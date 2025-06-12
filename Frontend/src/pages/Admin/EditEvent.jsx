import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Input from '../../components/Input'
import Button from '../../components/Button'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function EditEvent() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    theme: '',
    floorPlan: null // new file
  })

  const [existingImage, setExistingImage] = useState(null)
  const [error, setError] = useState('')

  // Load existing expo data
  useEffect(() => {
    const fetchExpo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/expos/${id}`, {
          withCredentials: true
        })
        const { title, description, date, location, theme } = res.data
        setFormData(prev => ({
          ...prev,
          title,
          description,
          date: date?.split('T')[0] || '',
          location,
          theme
        }))
        setExistingImage(res.data.floorPlan || null)
      } catch (err) {
        console.error(err)
        setError('Failed to load expo')
      }
    }

    fetchExpo()
  }, [id])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({ ...prev, floorPlan: file }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const formData2 = new FormData()
      formData2.append('title', formData.title)
      formData2.append('description', formData.description)
      formData2.append('date', formData.date)
      formData2.append('location', formData.location)
      formData2.append('theme', formData.theme)

      if (formData.floorPlan) {
        formData2.append('floorPlan', formData.floorPlan)
      }

      await axios.put(`http://localhost:5000/api/expos/${id}`, formData2, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })

      toast.success('Expo updated successfully')
      navigate('/admin-dashboard')
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.msg || 'Failed to update expo')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Expo</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-lg p-6">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>
          )}

          <Input
            label="Title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />

          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />

          <Input
            label="Location"
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            required
          />

          <Input
            label="Theme"
            type="text"
            value={formData.theme}
            onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
          />

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-primary-500 min-h-[100px]"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Floor Plan Image</label>
            {existingImage && (
              <img
                src={`data:image/png;base64,${existingImage}`}
                alt="Existing floor plan"
                className="mb-2 w-32 h-32 object-contain border rounded"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={() => navigate('/admin-dashboard')}
              className="!bg-gray-100 !text-gray-700 hover:!bg-gray-200"
            >
              Cancel
            </Button>
            <Button type="submit">Update Expo</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
