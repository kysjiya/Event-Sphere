import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../components/Button';

export default function ManageExpos() {
  const [expos, setExpos] = useState([]);
  const navigate = useNavigate();

  // Fetch expos
  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/expos', {
          withCredentials: true,
        });
        setExpos(res.data);
      } catch (err) {
        console.error('Failed to fetch expos:', err);
        toast.error('Failed to fetch expos');
      }
    };
    fetchExpos();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expo?')) return;
    try {
        await axios.delete(`http://localhost:5000/api/expos/${id}`, {
            withCredentials: true
          });
          
      setExpos(prev => prev.filter(expo => expo._id !== id));
      toast.success('Expo deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete expo');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Expos</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expos.map((expo) => (
              <tr key={expo._id} className="border-t">
                <td className="py-2 px-4">{expo.title}</td>
                <td className="py-2 px-4">{new Date(expo.date).toLocaleDateString()}</td>
                <td className="py-2 px-4">{expo.location}</td>
                <td className="py-2 px-4 space-x-2">
                  <Button
                    type="button"
                    className="!bg-blue-500 hover:!bg-blue-600"
                    onClick={() => navigate(`/edit-event/${expo._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    className="!bg-red-500 hover:!bg-red-600"
                    onClick={() => handleDelete(expo._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    type="button"
                    className="!bg-green-500 hover:!bg-green-600"
                    onClick={() => navigate(`/add-booth/${expo._id}`)}
                  >
                    Booths
                  </Button>
                </td>
              </tr>
            ))}
            {expos.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No expos found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
