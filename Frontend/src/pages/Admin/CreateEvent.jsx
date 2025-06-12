// Modified CreateEvent component to send data to your backend API
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Input from '../../components/Input'
import Button from '../../components/Button'
import axios from 'axios';
import { toast } from 'react-toastify'


export default function CreateEvent() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    theme: '',
    floorPlan: null
  })
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({ ...prev, floorPlan: file }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const formData2 = new FormData(); // ✅ declared first


      formData2.append('title', formData.title);
      formData2.append('description', formData.description);
      formData2.append('date', formData.date);
      formData2.append('location', formData.location);
      formData2.append('theme', formData.theme); // or other field
      if (formData.image) {
        formData2.append('floorPlan', formData.image); // this must match backend field
      }
  
      console.log(formData);

      const res = await axios.post('http://localhost:5000/api/expos', formData2, {
  headers: {
    'Content-Type': 'multipart/form-data',

  },
  withCredentials: true, // ✅ Very important!
});

// console.log('Cookies:', req.cookies);

  
      toast.success("Expo created successfully");
      navigate('/admin-dashboard');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.msg || 'Failed to create expo');
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Expo</h1>

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
            <Button type="submit">Create Expo</Button>
          </div>
        </form>
      </div>
    </div>
  )
}