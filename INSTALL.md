## Advanced Setup

### Setting Up Supabase Locally

For local development, you can set up Supabase locally to avoid dependency on the cloud service:

1. Install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)
2. Install the Supabase CLI:
   \`\`\`bash
   npm install -g supabase
   \`\`\`
3. Start Supabase locally:
   \`\`\`bash
   supabase start
   \`\`\`
4. Update your `.env.local` file with the local Supabase credentials displayed after starting

### Working with Paystack in Test Mode

1. Sign up for a Paystack account at [paystack.com](https://paystack.com)
2. Navigate to the Dashboard > Settings > API Keys
3. Copy your test public key
4. Update your `.env.local` file with the test key:
   \`\`\`
   PAYSTACK_PUBLIC_KEY="your-test-public-key"
   \`\`\`
5. For testing payments, use Paystack's test card:
   - Card Number: 4084 0840 8408 4081
   - CVV: 408
   - Expiry Date: Any future date
   - PIN: 0000
   - OTP: 123456

### Setting Up Email Services Locally

For local email testing, you can use Mailhog:

1. Install Mailhog:
   - On macOS:
     \`\`\`bash
     brew install mailhog
     \`\`\`
   - On Windows (with Chocolatey):
     \`\`\`bash
     choco install mailhog
     \`\`\`
2. Start Mailhog:
   \`\`\`bash
   mailhog
   \`\`\`
3. Access the Mailhog interface at [http://localhost:8025](http://localhost:8025)
4. Update your `.env.local` file to use Mailhog:
   \`\`\`
   EMAIL_SERVER=smtp://localhost:1025
   EMAIL_FROM=noreply@hardytechnology.xyz
   \`\`\`

## Data Seeding

To populate your database with sample data for development:

1. Create a seed script:
   \`\`\`bash
   npx prisma db seed
   \`\`\`
2. Make sure you have the seed script defined in your `package.json`:
   \`\`\`json
   "prisma": {
     "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
   }
   \`\`\`
3. Create a file at `prisma/seed.ts` with your seed data (example):
   \`\`\`typescript
   import { PrismaClient } from '@prisma/client'
   
   const prisma = new PrismaClient()
   
   async function main() {
     // Create sample training events
     await prisma.trainingEvent.createMany({
       data: [
         {
           title: 'Introduction to React',
           description: 'Learn the basics of React development',
           date: new Date('2023-12-25'),
           location: 'Lagos, Nigeria',
           price: 15000,
           approved: true,
           organizer: 'Hardy Technology',
           contactEmail: 'training@hardytechnology.xyz',
         },
         // Add more sample data as needed
       ],
     })
   
     console.log('Seed data created')
   }
   
   main()
     .catch((e) => {
       console.error(e)
       process.exit(1)
     })
     .finally(async () => {
       await prisma.$disconnect()
     })
   \`\`\`

## Docker Setup (Optional)

You can use Docker to run the entire application stack:

1. Create a `docker-compose.yml` file in the root of your project:
   \`\`\`yml
   version: '3'
   
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DATABASE_URL=postgresql://postgres:postgres@db:5432/hardytech
       depends_on:
         - db
     
     db:
       image: postgres:14
       ports:
         - "5432:5432"
       environment:
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=postgres
         - POSTGRES_DB=hardytech
       volumes:
         - postgres_data:/var/lib/postgresql/data
   
   volumes:
     postgres_data:
   \`\`\`

2. Create a `Dockerfile` in the root of your project:
   \`\`\`Dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm install
   
   COPY . .
   
   RUN npx prisma generate
   
   CMD ["npm", "run", "dev"]
   \`\`\`

3. Start the Docker containers:
   \`\`\`bash
   docker-compose up -d
   \`\`\`

4. Access your application at [http://localhost:3000](http://localhost:3000)

## Git Workflow

We recommend the following Git workflow for this project:

1. **Main Branch**: Production-ready code
2. **Develop Branch**: Integration branch for features
3. **Feature Branches**: Create from develop, named as `feature/feature-name`
4. **Hotfix Branches**: Create from main, named as `hotfix/issue-description`

### Example Workflow:

\`\`\`bash
# Start a new feature
git checkout develop
git pull
git checkout -b feature/new-calculator-feature

# Make changes and commit
git add .
git commit -m "Add new calculator feature"

# Push to remote and create PR
git push -u origin feature/new-calculator-feature
\`\`\`

## Testing

### Setup and Run Tests

1. Install testing dependencies:
   \`\`\`bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
   \`\`\`

2. Create a `jest.config.js` file:
   \`\`\`javascript
   module.exports = {
     testEnvironment: 'jsdom',
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
     moduleNameMapper: {
       '^@/components/(.*)$': '<rootDir>/components/$1',
       '^@/app/(.*)$': '<rootDir>/app/$1',
       '^@/lib/(.*)$': '<rootDir>/lib/$1',
     },
   }
   \`\`\`

3. Create a `jest.setup.js` file:
   \`\`\`javascript
   import '@testing-library/jest-dom'
   \`\`\`

4. Add test scripts to `package.json`:
   \`\`\`json
   "scripts": {
     "test": "jest",
     "test:watch": "jest --watch"
   }
   \`\`\`

5. Run tests:
   \`\`\`bash
   npm test
   \`\`\`

## Common Development Tasks

### Adding a New Page

1. Create a new file in the `app` directory:
   \`\`\`bash
   touch app/new-page/page.tsx
   \`\`\`

2. Create the React component:
   \`\`\`tsx
   export default function NewPage() {
     return (
       <div className="container mx-auto py-10">
         <h1 className="text-2xl font-bold">New Page</h1>
         <p>This is a new page in the application.</p>
       </div>
     )
   }
   \`\`\`

### Creating a New Component

1. Create a new file in the `components` directory:
   \`\`\`bash
   touch app/components/NewComponent.tsx
   \`\`\`

2. Create the React component:
   \`\`\`tsx
   interface NewComponentProps {
     title: string
   }
   
   export function NewComponent({ title }: NewComponentProps) {
     return (
       <div className="bg-white shadow rounded p-4">
         <h2 className="text-xl font-semibold">{title}</h2>
         <p>This is a new component.</p>
       </div>
     )
   }
   \`\`\`

### Adding a New API Route

1. Create a new file in the `app/api` directory:
   \`\`\`bash
   mkdir -p app/api/new-endpoint
   touch app/api/new-endpoint/route.ts
   \`\`\`

2. Create the API route:
   \`\`\`typescript
   import { NextResponse } from 'next/server'
   
   export async function GET(request: Request) {
     return NextResponse.json({ message: 'Hello from the API!' })
   }
   
   export async function POST(request: Request) {
     const body = await request.json()
     return NextResponse.json({ 
       message: 'Data received', 
       data: body 
     })
   }
   \`\`\`

## Performance Monitoring

To monitor performance during development:

1. Install the React DevTools extension for your browser
2. Use the Profiler tab to analyze component rendering
3. Add the Performance mode to your Next.js dev command:
   \`\`\`bash
   ANALYZE=true npm run build
   \`\`\`

## Deployment Checklist

Before deploying to production, ensure:

1. All environment variables are properly set on Vercel
2. Database migrations have been applied
3. All tests pass
4. Lighthouse scores are acceptable
5. SEO metadata is properly configured
6. Analytics is set up correctly
7. Error tracking is in place

## Getting Help

If you encounter any issues not covered in this guide:

1. Check the project issues on GitHub
2. Refer to the official documentation of the technologies used
3. Reach out to the development team on the project's communication channel

