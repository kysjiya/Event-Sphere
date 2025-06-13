import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import EventCard from '../../components/EventCard'
import Button from '../../components/Button'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import Sidebar from './Sidebar'


export default function AdminDashboard() {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    upcomingEvents: 0
  })

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/')
      return
    }

    const fetchExpos = async () => {
      try {
        const res = await api.get('/expos') // This should call getAllExpos
        const expos = res.data.filter(e => e.createdBy === user.id) // only expos created by this admin

        setEvents(expos)

        const now = new Date()
        setStats({
          totalEvents: expos.length,
          totalAttendees: expos.reduce((acc, e) => acc + (e.attendees?.length || 0), 0),
          upcomingEvents: expos.filter(e => new Date(e.datetime) > now).length
        })
      } catch (err) {
        toast.error('Failed to fetch expos')
        console.error(err)
      }
    }

    fetchExpos()
  }, [user, isAdmin, navigate])

  const handleEdit = (expoId) => {
    navigate(`/edit-expo/${expoId}`)
  }

  const handleDelete = async (expoId) => {
    if (!window.confirm('Are you sure you want to delete this Exhibition?')) return

    try {
      await api.delete(`/expo/${expoId}`)
      setEvents(prev => prev.filter(e => e._id !== expoId))
      toast.success('Expo deleted successfully')
    } catch (err) {
      toast.error('Failed to delete expo')
    }
  }

  return (
    <div className="flex">
      <Sidebar />
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Exhibitions</h1>
          <p className="text-gray-600">Manage your Exhibitions, track Exhibitors & Attendees</p>
        </div>
        <Button onClick={() => navigate('/create')} className="px-4 py-2">
          Create New Event
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Exhibitions</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Attendees</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalAttendees}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Exhibitors</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalAttendees}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Upcoming Exhibitions</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.upcomingEvents}</p>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't created any events yet.</p>
          <Button onClick={() => navigate('/create')} className="px-6 py-2">
            Create Your First Event
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard
              key={event._id}
              event={event}
              showActions={true}
              onEdit={() => handleEdit(event._id)}
              onDelete={() => handleDelete(event._id)}
            />
          ))}
        </div>
      )}
    </div>
    </div>

  )
}
