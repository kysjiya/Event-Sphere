import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';
import Input from '../components/Input'
import Button from '../components/Button'
import api from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
<<<<<<< Updated upstream
    e.preventDefault();
  
=======
    e.preventDefault()

    const res = await api.post('/auth/login', {
      email: email, password: password
    });

    console.log(res)

    if (res) {
      alert('Login Successfull')

      const { user } = res.data;
      Login(user)
      console.log(user.role)

      switch (user.role) {
        case "admin":
          navigate('/admin-dashboard')
          return;
        case "organizer":
          navigate('/dashboard')
          return;
        case "exhibitor":
          navigate('/exhibitor-dashboard')
          return;
        case "attendee":
          navigate('/')
          return;

        default:
          navigate('/')
          return;
      }
      


      navigate('/')
    }

>>>>>>> Stashed changes
    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });
  
      if (res && res.data?.user) {
        const { user } = res.data;
  
        toast.success('Login Successful');
  
        switch (user.role) {
          case "admin":
            navigate('/admin-dashboard');
            break;
          case "organizer":
            navigate('/dashboard');
            break;
          case "exhibitor":
            navigate('/exhibitor-dashboard');
            break;
          case "attendee":
            navigate('/');
            break;
          default:
            navigate('/');
        }
      } else {
        toast.error('Unexpected response from server');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="card max-w-md w-full space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="mt-2 text-center text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
              {error}
            </div>
          )}
          <Input
            label="Email address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}
