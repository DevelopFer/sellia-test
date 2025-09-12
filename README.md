# Sellia - E-commerce Platform

A modern full-stack e-commerce platform built with NestJS and Vue 3, utilizing git submodules for modular development.

## Architecture

This project uses git submodules to organize the codebase into independent repositories:

- **Main Repository**: Contains Docker orchestration and project documentation
- **API Submodule** (`api/`): NestJS backend API with TypeScript, Vitest testing, and users CRUD
- **Client Submodule** (`client/`): Vue 3 frontend with shadcn-vue UI components and TailwindCSS

## Project Structure

```
sellia/
├── api/                    # NestJS API (git submodule)
│   ├── src/
│   │   ├── users/          # Users CRUD module
│   │   └── config/         # Configuration management
│   ├── test/               # E2E tests
│   └── vitest.config.ts    # Vitest configuration
├── client/                 # Vue 3 Client (git submodule)
│   ├── src/
│   │   ├── components/ui/  # shadcn-vue UI components
│   │   ├── router/         # Vue Router setup
│   │   └── stores/         # Pinia state management
│   └── tailwind.config.js  # TailwindCSS configuration
├── docker-compose.yml      # Docker orchestration
├── .dockerignore          # Docker ignore rules
├── .gitignore             # Git ignore rules
├── .gitmodules            # Git submodules configuration
└── README.md              # This file
```

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git

## Getting Started

### 1. Clone with Submodules

When cloning this repository, you need to initialize and update the submodules:

```bash
# Clone the main repository
git clone <repository-url> sellia
cd sellia

# Initialize and update submodules
git submodule init
git submodule update

# Alternative: Clone with submodules in one command
git clone --recurse-submodules <repository-url> sellia
```

### 2. Development Setup

#### Option A: Using Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Option B: Local Development

**API Setup:**
```bash
cd api
npm install
npm run start:dev

# Run tests
npm run test        # Unit tests with Vitest
npm run test:e2e    # E2E tests
```

**Client Setup:**
```bash
cd client
npm install
npm run dev
```

## Current Implementation Status

✅ **Completed Features:**
- Git submodule architecture with independent repositories
- NestJS API with TypeScript and Vitest testing framework
- Users CRUD module with complete REST endpoints
- Vue 3 client with shadcn-vue UI components
- TailwindCSS styling and responsive design
- Docker containerization for both services
- Comprehensive development and testing setup

📋 **API Features:**
- **Users Module**: Complete CRUD operations (Create, Read, Update, Delete)
- **Configuration Management**: Environment-based configuration
- **Testing Suite**: Unit tests and E2E tests with Vitest
- **TypeScript**: Full type safety throughout the application
- **Docker Ready**: Containerized for easy deployment

📋 **Client Features:**
- **Vue 3 Composition API**: Modern reactive framework
- **shadcn-vue Components**: Beautiful, accessible UI components
- **TailwindCSS**: Utility-first CSS framework
- **Vue Router**: Single-page application routing
- **Pinia**: State management solution
- **TypeScript Support**: Type-safe client development

## Working with Submodules

### Key Commands

```bash
# Update all submodules to latest commits
git submodule update --remote

# Update a specific submodule
git submodule update --remote api
git submodule update --remote client

# Check submodule status
git submodule status

# Work inside a submodule
cd api
git checkout main
# Make changes, commit, push as normal
cd ..

# Update main repo to point to new submodule commits
git add api
git commit -m "Update API submodule to latest version"
```

### Making Changes

1. **Navigate to the submodule directory** (api/ or client/)
2. **Work normally** - make changes, commit, push to the submodule's repository
3. **Return to main repository** and commit the submodule pointer update
4. **Push changes** to both the submodule and main repositories

### Submodule Workflow Example

```bash
# Make changes to API
cd api
git checkout main
echo "// new feature" >> src/app.service.ts
git add .
git commit -m "Add new feature"
git push origin main
cd ..

# Update main repo to reference new commit
git add api
git commit -m "Update API submodule with new feature"
git push origin main

# Other developers can update their local copy
git pull
git submodule update --remote
```

## Development Workflow

### Daily Development

1. **Pull latest changes**:
   ```bash
   git pull
   git submodule update --remote
   ```

2. **Work on features** in respective submodules
3. **Test integration** using Docker Compose
4. **Commit and push** submodule changes first, then main repo

### Adding New Submodules

```bash
# Add a new submodule
git submodule add <repository-url> <local-path>
git commit -m "Add new submodule: <name>"
```

### Removing Submodules

```bash
# Remove submodule (Git 1.8.3+)
git submodule deinit -f <submodule-path>
git rm -f <submodule-path>
git commit -m "Remove submodule: <name>"
```

## Services

### API (NestJS)
- **Port**: 3001
- **URL**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api (Swagger)
- **Health Check**: http://localhost:3001/health

### Client (Vue 3)
- **Port**: 3000
- **URL**: http://localhost:3000

## Environment Variables

Copy `.env.example` to `.env` in each submodule and configure as needed:

**API Environment Variables:**
- `NODE_ENV`: Environment (development/production)
- `PORT`: API server port (default: 3001)
- `DATABASE_URL`: Database connection string

**Client Environment Variables:**
- `VITE_API_URL`: Backend API URL (default: http://localhost:3001)

## Testing

### API Tests
```bash
cd api
npm run test          # Unit tests with Vitest
npm run test:watch    # Watch mode for development
npm run test:e2e      # End-to-end tests
npm run test:coverage # Coverage report
```

### Client Tests
```bash
cd client
npm run test:unit     # Unit tests (when implemented)
npm run test:e2e      # End-to-end tests (when implemented)
```

## API Endpoints

### Users API
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Repository Structure

This project consists of three separate Git repositories:

1. **Main Repository** (`sellia`): Orchestration and documentation
   - Repository: Contains this README and Docker Compose configuration
   - Submodules: References specific commits of API and client repositories

2. **API Repository** (`sellia-api`): NestJS backend
   - Independent development and version control
   - Can be deployed separately
   - Contains complete API application with tests

3. **Client Repository** (`sellia-client`): Vue 3 frontend  
   - Independent development and version control
   - Can be deployed separately
   - Contains complete client application

## Deployment

Each submodule can be deployed independently or together using Docker Compose:

```bash
# Development deployment
docker-compose up -d

# Production deployment (when docker-compose.prod.yml is created)
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Submodule Issues

**Problem**: Submodule shows as modified but no changes made
```bash
# Solution: Reset submodule to tracked commit
git submodule update --init
```

**Problem**: Submodule detached HEAD state
```bash
# Solution: Checkout main branch
cd <submodule>
git checkout main
```

**Problem**: Submodule not updating
```bash
# Solution: Force update
git submodule update --init --recursive --force
```

**Problem**: File protocol not allowed error
```bash
# Solution: Configure git to allow file protocol for local repositories
git config --global protocol.file.allow always
```

## Next Steps

🚀 **Potential Enhancements:**
- Add authentication and authorization
- Implement database integration (PostgreSQL/MongoDB)
- Add API documentation with Swagger
- Implement real-time features with WebSockets
- Add comprehensive error handling and logging
- Set up CI/CD pipelines for each repository
- Add production Docker configurations
- Implement caching strategies
- Add monitoring and health checks

## Contributing

1. Fork the main repository and relevant submodule repositories
2. Create feature branches in the appropriate repositories  
3. Make changes and test thoroughly
4. Submit pull requests to the respective repositories
5. Update main repository to reference new submodule commits

## License

This project is licensed under the MIT License.