import axios from 'axios';
import { io } from 'socket.io-client';

// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Create Socket.IO instance
const socket = io('http://localhost:5000', {
  autoConnect: false
});

// Socket.IO event handlers
const setupSocket = (onStatsUpdate) => {
  socket.on('statsUpdate', (data) => {
    onStatsUpdate(data);
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connection error:', err.message);
  });
};

// Export socket instance and setup function
export { socket, setupSocket };

// User profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Progress data
export const getProgressData = async () => {
  try {
    const response = await api.get('/progress');
    return response.data;
  } catch (error) {
    console.error('Error fetching progress data:', error);
    throw error;
  }
};

// Platform statistics
export const getPlatformStats = async (platform) => {
  try {
    const response = await api.get(`/stats/${platform}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${platform} stats:`, error);
    throw error;
  }
};

export default api;


