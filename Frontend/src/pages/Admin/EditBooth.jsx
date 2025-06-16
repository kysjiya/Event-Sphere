import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Input from '../../components/Input'
import Button from '../../components/Button'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function EditBooth() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { boothId } = useParams()

  const [formData, setFormData] = useState({
    hall: '',
    row: '',
    boothNumber: '',
    price: '',
    boothSize: ''
  })

useEffect(() => {
  const fetchBooth = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/booth/${boothId}`);
      setFormData({
        hall: res.data.hall,
        row: res.data.row,
        startNumber: res.data.number.split('-')[2], // if format is HALL-ROW-#
        price: res.data.price,
        boothSize: res.data.size,
      });
    } catch (err) {
      console.error('Booth fetch failed:', err);
    }
  };

  fetchBooth();
}, [boothId]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
        const { boothId } = useParams();
        const res = await axios.put(`http://localhost:5000/api/booth/${boothId}`, formData, {
        withCredentials: true
      })

      toast.success('Booth updated successfully!')
      navigate('/manage-booth')
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.msg || 'Failed to update booth')
    }
  }

  if (loading) return <div className="p-4">Loading booth data...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Booth</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-lg p-6">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>
          )}

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
            label="Booth Number"
            type="number"
            value={formData.boothNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, boothNumber: e.target.value }))}
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
              onClick={() => navigate('/manage-booth')}
              className="!bg-gray-100 !text-gray-700 hover:!bg-gray-200"
            >
              Cancel
            </Button>
            <Button type="submit">Update Booth</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
