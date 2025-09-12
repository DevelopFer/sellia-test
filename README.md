# Sellia Project

A full-stack application with NestJS API and Vue 3 frontend, organized using Git submodules for modular development.

## Architecture

This project is structured as a monorepo with the following components:

- **API** (`/api`): NestJS backend API (Git submodule)
- **Client** (`/client`): Vue 3 frontend application (Git submodule)
- **Docker**: Container orchestration with docker-compose

## Git Submodules

This project uses Git submodules to manage the API and client as separate repositories:

```
sellia/
├── api/          # NestJS API (submodule)
├── client/       # Vue 3 Client (submodule)
├── docker-compose.yml
└── README.md
```

### Working with Submodules

#### Initial Setup
```bash
# Clone the main repository with submodules
git clone --recursive <main-repo-url>

# Or if already cloned, initialize submodules
git submodule update --init --recursive
```

#### Updating Submodules
```bash
# Update all submodules to latest commits
git submodule update --remote

# Update specific submodule
git submodule update --remote api
git submodule update --remote client
```

#### Working on Submodules
```bash
# Make changes in a submodule
cd api
git checkout main
# Make your changes
git add .
git commit -m "Your changes"
git push

# Update main repository to point to new commit
cd ..
git add api
git commit -m "Update API submodule"
git push
```

## Development

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

### Getting Started

1. Clone the repository with submodules:
   ```bash
   git clone --recursive <repo-url>
   cd sellia
   ```

2. Start the development environment:
   ```bash
   docker-compose up --build
   ```

3. Access the applications:
   - API: http://localhost:3001
   - Client: http://localhost:3002

### Local Development

For development without Docker:

1. Start the API:
   ```bash
   cd api
   npm install
   npm run start:dev
   ```

2. Start the client:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Project Structure

### API (NestJS)
- RESTful API with TypeScript
- Zod validation schemas
- Vitest for testing
- Docker containerization

### Client (Vue 3)
- Vue 3 with Composition API
- TypeScript support
- shadcn-vue UI components
- Pinia for state management
- Tailwind CSS for styling

## Contributing

1. Fork the repository
2. Create a feature branch in the relevant submodule
3. Make your changes
4. Test your changes
5. Update the main repository submodule references
6. Create a pull request

## License

[Add your license here]