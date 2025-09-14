# Digital Ocean Deployment Guide

This guide explains how to deploy the Sellia API to Digital Ocean App Platform.

## Prerequisites

1. **Digital Ocean Account**: Sign up at [digitalocean.com](https://digitalocean.com)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Environment Variables**: Prepare your production environment variables

## Deployment Options

### Option 1: Using Digital Ocean UI (Recommended for beginners)

1. **Connect GitHub Repository**:
   - Go to [Digital Ocean Apps](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Choose "GitHub" as source
   - Select your repository and the `deploy/digital-ocean` branch

2. **Configure Build Settings**:
   - Source Directory: `/api`
   - Build Command: `npm run build`
   - Run Command: `npm run start:prod`

3. **Set Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=your-mongodb-connection-string
   OPENAI_API_KEY=your-openai-api-key
   OPENAI_MODEL=gpt-4o-mini
   CORS_ORIGIN=https://your-app-url.ondigitalocean.app
   JWT_SECRET=your-secure-jwt-secret
   ```

### Option 2: Using App Platform Spec (Advanced)

1. **Install doctl CLI**:
   ```bash
   # macOS
   brew install doctl
   
   # Or download from: https://github.com/digitalocean/doctl/releases
   ```

2. **Authenticate**:
   ```bash
   doctl auth init
   ```

3. **Deploy using spec file**:
   ```bash
   doctl apps create --spec .do/app.yaml
   ```

## Database Setup

### Option 1: Digital Ocean Managed MongoDB
1. Go to [Digital Ocean Databases](https://cloud.digitalocean.com/databases)
2. Create a new MongoDB cluster
3. Copy the connection string to your `DATABASE_URL` environment variable

### Option 2: MongoDB Atlas (Recommended)
1. Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Whitelist Digital Ocean's IP ranges or use `0.0.0.0/0` for testing
3. Create a database user and get the connection string

## Environment Variables Setup

Copy the `.env.production.example` file and fill in your values:

```bash
cp .env.production.example .env.production
```

**Important Security Notes**:
- Never commit real API keys or secrets to your repository
- Use Digital Ocean's environment variable feature to inject secrets
- Generate a strong JWT secret using: `openssl rand -base64 32`

## Build Optimizations

The production Dockerfile includes:
- ✅ Multi-stage builds for smaller image size
- ✅ Security: Non-root user
- ✅ Production-only dependencies
- ✅ Health checks
- ✅ Optimized layers for better caching

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check that all dependencies are in `package.json` (not in Dockerfile)
   - Ensure compatible versions (especially zod and openai)

2. **Database Connection**:
   - Verify `DATABASE_URL` format
   - Check IP whitelisting for external databases

3. **OpenAI API**:
   - Ensure valid `OPENAI_API_KEY`
   - Check API quota and billing

### Monitoring:

- View logs in Digital Ocean Apps dashboard
- Monitor resource usage and scale as needed
- Set up alerts for downtime or errors

## Scaling

Digital Ocean App Platform auto-scales based on:
- CPU usage
- Memory usage
- Request volume

You can also manually scale in the dashboard.

## Cost Optimization

- Start with `basic-xxs` instance size ($5/month)
- Monitor usage and scale up only when needed
- Use caching strategies to reduce database calls
- Optimize Prisma queries for better performance