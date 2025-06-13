import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AllExhibitors() {
  const [exhibitors, setExhibitors] = useState([]);

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/exhibitor-portal/all', {
          withCredentials: true,
        });
        setExhibitors(res.data);
      } catch (err) {
        console.error('Failed to fetch exhibitors:', err);
        toast.error('Failed to fetch exhibitor profiles');
      }
    };

    fetchExhibitors();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Exhibitors</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Website</th>
            </tr>
          </thead>
          <tbody>
            {exhibitors.map((exhibitor) => (
              <tr key={exhibitor._id} className="border-t">
                <td className="py-2 px-4">{exhibitor.user?.name || 'N/A'}</td>
                <td className="py-2 px-4">{exhibitor.user?.email || 'N/A'}</td>
                <td className="py-2 px-4">{exhibitor.companyName || 'N/A'}</td>
                <td className="py-2 px-4">{exhibitor.phone || 'N/A'}</td>
                <td className="py-2 px-4">
                  {exhibitor.website ? (
                    <a
                      href={exhibitor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {exhibitor.website}
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
            {exhibitors.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No exhibitor profiles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
