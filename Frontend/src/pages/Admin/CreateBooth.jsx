import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Input from '../../components/Input'
import Button from '../../components/Button'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function CreateBooth() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    expoId: '',
    hall: '',
    row: '',
    startNumber: '',
    endNumber: '',
    price: '',
    boothSize: ''
  })

  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post('http://localhost:5000/api/booths', formData, {
        withCredentials: true
      })

      toast.success('Booth(s) created successfully!')
      navigate('/admin-dashboard')
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.msg || 'Failed to create booth')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Booths</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-lg p-6">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>
          )}

          <Input
            label="Expo ID"
            type="text"
            value={formData.expoId}
            onChange={(e) => setFormData(prev => ({ ...prev, expoId: e.target.value }))}
            required
          />

          <Input
            label="Hall"
            type="text"
            value={formData.hall}
            onChange={(e) => setFormData(prev => ({ ...prev, hall: e.target.value }))}
            required
          />

          <Input
            label="Row"
            type="text"
            value={formData.row}
            onChange={(e) => setFormData(prev => ({ ...prev, row: e.target.value }))}
            required
          />

          <Input
            label="Start Number"
            type="number"
            value={formData.startNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, startNumber: e.target.value }))}
            required
          />

          <Input
            label="End Number"
            type="number"
            value={formData.endNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, endNumber: e.target.value }))}
            required
          />

          <Input
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            required
          />

          <Input
            label="Booth Size (e.g. 12x12)"
            type="text"
            value={formData.boothSize}
            onChange={(e) => setFormData(prev => ({ ...prev, boothSize: e.target.value }))}
            required
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={() => navigate('/admin-dashboard')}
              className="!bg-gray-100 !text-gray-700 hover:!bg-gray-200"
            >
              Cancel
            </Button>
            <Button type="submit">Create Booths</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
