import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import { toast } from 'react-toastify';

export default function ManageBooths() {
  const { expoId } = useParams();
  const [booths, setBooths] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/booths/expo/${expoId}`, {
          withCredentials: true,
        });
        setBooths(res.data);
      } catch (err) {
        console.error('Failed to fetch booths:', err);
        toast.error('Failed to fetch booths');
      }
    };
    fetchBooths();
  }, [expoId]);

  const updateStatus = async (boothId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/booths/reserve/${boothId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      setBooths(prev =>
        prev.map(booth =>
          booth._id === boothId ? { ...booth, status: newStatus } : booth
        )
      );
      toast.success('Booth status updated');
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Booths</h1>
        <Button
          type="button"
          className="!bg-green-600 hover:!bg-green-700"
          onClick={() => navigate(`/CreateBooth/${expoId}`)}
        >
          + Create New Booth
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="py-3 px-4">Number</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {booths.map((booth) => (
              <tr key={booth._id} className="border-t">
                <td className="py-2 px-4">{booth.number}</td>
                <td className="py-2 px-4">{booth.location}</td>
                <td className="py-2 px-4">{booth.size}</td>
                <td className="py-2 px-4 capitalize">{booth.status}</td>
                <td className="py-2 px-4 space-x-2">
                  <Button
                    type="button"
                    className="!bg-blue-500 hover:!bg-blue-600"
                    onClick={() => navigate(`/EditBooth/${booth._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    className="!bg-yellow-500 hover:!bg-yellow-600"
                    onClick={() =>
                      updateStatus(
                        booth._id,
                        booth.status === 'available' ? 'reserved' : 'available'
                      )
                    }
                  >
                    Toggle Status
                  </Button>
                </td>
              </tr>
            ))}
            {booths.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No booths found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
