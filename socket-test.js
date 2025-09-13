const io = require('socket.io-client');

console.log('Attempting to connect to socket server...');

const socket = io('http://localhost:3001', {
  transports: ['websocket'],
  timeout: 5000,
});

socket.on('connect', () => {
  console.log('Socket connected successfully:', socket.id);
  
  // Test user online
  socket.emit('user:online', { userId: 'test-user-123' });
  
  // Listen for message events
  socket.on('message:new', (data) => {
    console.log('Received message event:', data);
  });
  
  console.log('Socket test ready - will stay connected for 30 seconds');
  
  setTimeout(() => {
    console.log('Disconnecting socket test...');
    socket.disconnect();
    process.exit(0);
  }, 30000);
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error.message);
  process.exit(1);
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});