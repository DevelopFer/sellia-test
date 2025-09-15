const { io } = require('socket.io-client');

console.log('🔧 Testing Socket.IO connection to API server...');

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
  timeout: 10000,
});

socket.on('connect', () => {
  console.log('✅ Socket connected successfully!');
  console.log('Socket ID:', socket.id);
  

  const testUserId = '68c7b8c3ac8bc326beb3d0df'; // our test user
  const conversationId = '68c7b8d8ac8bc326beb3d0e0'; // our test conversation
  
  console.log('🚪 Attempting to join conversation room...');
  socket.emit('conversation:join', { conversationId, userId: testUserId });
  

  socket.onAny((event, ...args) => {
    console.log('📨 Received event:', event, args);
  });
  

  setTimeout(() => {
    console.log('👋 Disconnecting...');
    socket.disconnect();
    process.exit(0);
  }, 5000);
});

socket.on('connect_error', (error) => {
  console.error('❌ Socket connection error:', error);
  process.exit(1);
});

socket.on('disconnect', (reason) => {
  console.log('👋 Socket disconnected:', reason);
});