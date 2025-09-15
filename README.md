# 💬 Sellia - Real-Time Chat Application

A modern, scalable real-time chat application built with Vue 3, NestJS, and MongoDB. Features include real-time messaging, file sharing, AI bot integration, and a responsive UI.

## 🌟 Features

### Core Functionality
- ✅ **Real-time messaging** with Socket.IO
- ✅ **User authentication** (username-based login)
- ✅ **Message history** with pagination
- ✅ **Message persistence** in MongoDB
- ✅ **Responsive UI** with distinct message styles
- ✅ **Input validation** (empty/long message prevention)

### Advanced Features
- 🚀 **File & Image sharing** with upload support
- 🤖 **AI Bot integration** (Celebrity character bots)
- 🔍 **Message search** capabilities
- 🛡️ **Security features** (XSS protection, rate limiting)
- 📱 **Mobile-responsive** design
- 🐳 **Docker containerization**

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: Vue 3 + Composition API
- **State Management**: Pinia
- **Build Tool**: Vite
- **UI Components**: Custom components with Tailwind CSS
- **Real-time**: Socket.IO Client
- **HTTP Client**: Axios
- **Validation**: Vee-Validate + Zod

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: MongoDB with Prisma ORM
- **Real-time**: Socket.IO
- **Validation**: Zod DTOs
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer
- **AI Integration**: OpenAI API

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: MongoDB 6
- **Deployment**: Digital Ocean App Platform

## 📁 Project Structure

```
sellia/
├── api/                          # NestJS Backend
│   ├── src/
│   │   ├── auth/                 # Authentication module
│   │   ├── conversations/        # Conversation management
│   │   ├── messages/             # Message handling
│   │   ├── socket/               # WebSocket gateway
│   │   ├── upload/               # File upload service
│   │   ├── users/                # User management
│   │   ├── openAI/               # AI bot integration
│   │   └── prisma/               # Database service
│   ├── prisma/                   # Database schema
│   ├── test/                     # Unit & E2E tests
│   └── uploads/                  # File storage
├── client/                       # Vue 3 Frontend
│   ├── src/
│   │   ├── components/           # Vue components
│   │   ├── stores/               # Pinia stores
│   │   ├── api/                  # API client
│   │   ├── types/                # TypeScript definitions
│   │   └── views/                # Route views
│   └── public/                   # Static assets
└── docker-compose.yml            # Container orchestration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clone & Setup
```bash
# Clone the repository
git clone https://github.com/DevelopFer/sellia-test.git
cd sellia

# Initialize and update submodules
git submodule init
git submodule update

# Or clone with submodules in one command
git clone --recurse-submodules https://github.com/DevelopFer/sellia-test.git sellia
```

### 2. Environment Configuration

#### Backend Configuration
```bash
cd api
cp .env.development.example .env.development
```

Edit `.env.development` with your settings:
```env
PORT=3001
DATABASE_URL="mongodb://mongo:27017/sellia"
OPENAI_API_KEY="your-openai-api-key-here"
OPENAI_MODEL="gpt-4o-mini"
CORS_ORIGIN="http://localhost:3002,http://localhost:3000"
```

#### Frontend Configuration
```bash
cd client
cp .env.development.example .env.development
```

Edit `.env.development`:
```env
VITE_API_URL=http://localhost:3001/api
```

### 3. Run with Docker (Recommended)
```bash
# Start all services
docker compose up --build

# Or run in detached mode
docker compose up -d --build
```

**Services will be available at:**
- Frontend: http://localhost:3002
- Backend API: http://localhost:3001
- MongoDB: localhost:27017

### 4. Manual Setup (Alternative)

#### Start MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongo mongo:6

# Or install MongoDB locally
```

#### Backend Setup
```bash
cd api
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

#### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🧪 Testing

### Backend Tests
```bash
cd api

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Frontend Tests
```bash
cd client

# Unit tests (when implemented)
npm run test

# E2E tests (when implemented)
npm run test:e2e
```

## � API Documentation

### Core Endpoints

#### Authentication
- `POST /api/users/login-or-register` - Login/Register user

#### Messages
- `GET /api/messages/:conversationId` - Get message history
- `POST /api/messages` - Send message

#### File Upload
- `POST /api/uploads` - Upload file/image
- `GET /api/uploads/:filename` - Serve uploaded file

#### Health Check
- `GET /api/health` - Service health
- `GET /api/health/db` - Database connectivity
- `GET /api/health/env` - Environment status

### WebSocket Events

#### Client → Server
- `user:online` - Mark user as online
- `user:offline` - Mark user as offline
- `conversation:join` - Join conversation room
- `conversation:leave` - Leave conversation room

#### Server → Client
- `user:status_changed` - User online/offline status
- `message:new` - New message received
- `user:online_confirmed` - Online status confirmed

## 🏛️ Architecture Decisions

### Design Patterns Used

1. **Module Pattern** (NestJS)
   - Clean separation of concerns
   - Dependency injection
   - Testable components

2. **Repository Pattern**
   - Database abstraction with Prisma
   - Centralized data access logic

3. **Observer Pattern**
   - Real-time updates via Socket.IO
   - Event-driven architecture

4. **Factory Pattern**
   - User creation and bot instantiation
   - Message type handling

### Security Measures

- **Input Sanitization**: Zod validation on all inputs
- **XSS Protection**: Helmet.js security headers
- **CORS Configuration**: Restricted origins
- **Rate Limiting**: Anti-spam protection
- **File Upload Security**: MIME type validation, size limits

### Scalability Considerations

- **Modular Architecture**: Easy to extend and maintain
- **Database Indexing**: Optimized MongoDB queries
- **Stateless Design**: Horizontal scaling ready
- **Containerization**: Easy deployment and scaling

## 🔌 Real-Time Communication

### Socket.IO Implementation

The application uses Socket.IO for real-time bidirectional communication:

**Connection Flow:**
1. User authenticates and connects to WebSocket
2. Server maintains user session and online status
3. Users join conversation rooms for targeted messaging
4. Real-time events broadcast to relevant participants

**Event Architecture:**
- **Connection Management**: Online/offline status tracking
- **Room-Based Messaging**: Users join specific conversation rooms
- **Broadcast System**: Messages sent only to conversation participants
- **Reconnection Handling**: Automatic reconnection with session recovery

## 🌐 Deployment

### Production Deployment (Digital Ocean)

The application is configured for deployment on Digital Ocean App Platform:

```bash
# Build for production
docker compose -f docker-compose.prod.yml up --build

# Or deploy via DO CLI
doctl apps create .do/app.yaml
```

### Environment Variables (Production)
```env
# API
NODE_ENV=production
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/sellia
OPENAI_API_KEY=sk-xxx
CORS_ORIGIN=https://your-client-domain.com

# Client
VITE_API_URL=https://your-api-domain.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```bash
# Ensure MongoDB is running
docker ps | grep mongo

# Check connection string
echo $DATABASE_URL
```

**CORS Errors**
```bash
# Verify CORS_ORIGIN environment variable
# Check client URL matches allowed origins
```

**File Upload Issues**
```bash
# Check uploads directory permissions
# Verify file size and type restrictions
```

### Support

For support and questions:
- Create an issue on GitHub
- Check existing documentation
- Review error logs in `docker compose logs`

---

## 🎯 Challenge Requirements Compliance

✅ **Frontend Requirements**
- Username-based login
- Message history display
- Real-time messaging
- Input validation
- Distinct message styles

✅ **Backend Requirements**  
- Paginated message history API
- Real-time Socket.IO communication
- MongoDB persistence
- Clean, scalable architecture
- Error handling and logging

✅ **Technical Requirements**
- Vue 3 + Pinia frontend
- NestJS backend
- MongoDB database
- Socket.IO real-time communication
- Unit tests (backend)
- Production-ready structure

✅ **Security Features**
- XSS protection
- Input validation with Zod
- Rate limiting
- Secure headers
- Content sanitization

✅ **Bonus Features**
- File/image sharing
- Docker containerization
- Production deployment
- AI bot integration

Built with ❤️ by [Fernando Ordonez](https://github.com/DevelopFer)