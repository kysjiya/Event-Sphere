import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'

export default function UpcomingExposRegistration() {
  const [expos, setExpos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedExpo, setSelectedExpo] = useState(null)

  const { user, isAttendee } = useAuth()

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/expos')
        setExpos(res.data)
      } catch (err) {
        toast.error('Failed to fetch expos')
      } finally {
        setLoading(false)
      }
    }
    fetchExpos()
  }, [])

  const handleRegister = async (expoId) => {
    if (!user || !isAttendee()) {
      toast.error("You must be logged in as an attendee to register")
      return
    }

    try {
      await axios.post(
        `http://localhost:5000/api/attendees/${user._id}/register-expo`,
        { expoId },
        { headers: { 'Content-Type': 'application/json' } }
      )
      toast.success('Successfully registered for the expo')
    } catch (err) {
      console.error("Registration failed:", err)
      toast.error(err?.response?.data?.msg || 'Registration failed')
    }
  }

  const confirmRegister = (expo) => {
    const confirmed = window.confirm(`Do you want to register for "${expo.title}"?`)
    if (confirmed) {
      handleRegister(expo._id)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upcoming Expos</h2>
      {loading ? (
        <p>Loading...</p>
      ) : expos.length === 0 ? (
        <p>No upcoming expos found.</p>
      ) : (
        <ul className="space-y-4">
          {expos.map((expo) => (
            <li key={expo._id} className="p-4 border rounded shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{expo.title}</h3>
                <p>{new Date(expo.date).toLocaleDateString()}</p>
                <p className="text-gray-600">{expo.location}</p>
              </div>
              <button
                onClick={() => confirmRegister(expo)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Register
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
