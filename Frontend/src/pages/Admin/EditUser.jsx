import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`, {
          withCredentials: true,
        });
        setFormData({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch user data');
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, formData, {
        withCredentials: true,
      });
      toast.success('User updated successfully');
      navigate('/All-Users');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.msg || 'Failed to update user');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit User</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow rounded">
          {error && <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>}

          <Input
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <div>
            <label className="block font-medium mb-1">Role</label>
            <select
              className="w-full border p-2 rounded"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="organizer">Organizer</option>
              <option value="exhibitor">Exhibitor</option>
              <option value="attendee">Attendee</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" onClick={() => navigate('/All-Users')} className="!bg-gray-100 !text-gray-700 hover:!bg-gray-200">Cancel</Button>
            <Button type="submit">Update User</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
