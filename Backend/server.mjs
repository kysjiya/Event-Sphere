import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.mjs';
import authRoutes from './routes/authRoutes.mjs';
import expoRoutes from './routes/expoRoutes.mjs';
import exhibitorRoutes from './routes/exhibitorRoutes.mjs';
import scheduleRoutes from './routes/scheduleRoutes.mjs';
import attendeeRoutes from './routes/attendeeRoutes.mjs';
import messageRoutes from './routes/messageRoutes.mjs';
import analyticsRoutes from './routes/analyticsRoutes.mjs';
import exhibitorProfileRoutes from './routes/exhibitorProfileRoutes.mjs';
import boothRoutes from './routes/boothRoutes.mjs';
import productRoutes from './routes/productRoutes.mjs';
import staffRoutes from './routes/staffRoutes.mjs';
import feedbackRoutes from './routes/feedbackRoutes.mjs';
import notificationRoutes from './routes/notificationRoutes.mjs';
// In your main server file
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // 👈 Exact frontend origin
      credentials: true,  
    }
  });

app.use(cors({
  origin: 'http://localhost:5173', // 👈 Exact frontend origin
  credentials: true,               // 👈 Allow credentials (cookies, auth headers)
}));
app.use(express.json());
app.use(cookieParser());

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    socket.on('join', (userId) => {
      socket.join(userId); // join a room using userId
      console.log(`User ${userId} joined room`);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
});

connectDB();

app.get('/', (req, res) => res.send('EventSphere API is running...'));

// Sample route to trigger notification
app.post('/send-notification', (req, res) => {
    const { userId, title, message } = req.body;
    io.to(userId).emit('notification', { title, message });
    res.status(200).json({ msg: 'Notification sent' });
});

app.use('/api/auth', authRoutes);
app.use('/api/expos', expoRoutes);
app.use('/api/exhibitor', exhibitorRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/attendees', attendeeRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/exhibitor-portal', exhibitorProfileRoutes);
app.use('/api/booths', boothRoutes);
app.use('/api/products', productRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
