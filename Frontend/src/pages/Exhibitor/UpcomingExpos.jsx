import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function UpcomingExpos() {
  const [expos, setExpos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/expos')
        const allExpos = res.data

        const now = new Date()
        const upcoming = allExpos.filter(expo => new Date(expo.date).getTime() > now.getTime())
        setExpos(upcoming)
      } catch (err) {
        console.error('Error fetching expos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExpos()
  }, [])

  const navigate = useNavigate();

const handleRegister = (expoId) => {
navigate(`/ExpoRegistrationForm/${expoId}`);
};

// console.log("Expo ID from URL:", expoId);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Upcoming Expos</h1>

      {loading ? (
        <p>Loading...</p>
      ) : expos.length === 0 ? (
        <p>No upcoming expos found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm text-sm">
            <thead>
              <tr className="bg-gray-100 text-left font-semibold text-gray-700">
                <th className="py-3 px-4 border-b">Title</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Location</th>
                <th className="py-3 px-4 border-b">Theme</th>
                <th className="py-3 px-4 border-b">Description</th>
                <th className="py-3 px-4 border-b">Floor Plan</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expos.map((expo) => (
                <tr key={expo._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{expo.title}</td>
                  <td className="py-3 px-4 border-b">
                    {new Date(expo.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b">{expo.location}</td>
                  <td className="py-3 px-4 border-b">{expo.theme || '—'}</td>
                  <td className="py-3 px-4 border-b max-w-xs overflow-hidden truncate">
                    {expo.description || '—'}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {expo.floorPlan ? (
                      <img
                      src={`data:image/png;base64,${expo.floorPlan}`}
                      alt="Floor Plan"
                      className="w-24 h-16 object-cover rounded shadow border"
                    />
                    
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-3 px-4 border-b">
  <button
    onClick={() => handleRegister(expo._id)}
    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
  >
    Register
  </button>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
