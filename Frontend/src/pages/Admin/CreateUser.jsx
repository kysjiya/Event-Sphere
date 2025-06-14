import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreateUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'attendee'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/users', formData, {
        withCredentials: true,
      });
      toast.success('User created successfully');
      navigate('/All-Users');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.msg || 'Failed to create user');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create User</h1>
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
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            <Button type="submit">Create User</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
