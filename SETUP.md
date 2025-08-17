# MedReplace Setup Guide

## Database Setup

The application requires a PostgreSQL database to function. You can use Neon (free tier available) or any other PostgreSQL provider.

### Option 1: Use Neon (Recommended - Free)

1. Go to [https://neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string from your project dashboard
4. Create a `.env.local` file in the root directory with:

```env
DATABASE_URL=your_neon_connection_string_here
JWT_SECRET=medical-replacement-platform-secret-key-2024
NODE_ENV=development
```

### Option 2: Use Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database
3. Create a `.env.local` file with:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/medreplace
JWT_SECRET=medical-replacement-platform-secret-key-2024
NODE_ENV=development
```

### Database Schema Setup

After setting up your database connection:

1. Run the database schema creation script:
   ```bash
   # If using Neon, you can run this in their SQL editor
   # Copy the contents of scripts/01-create-tables.sql and run it
   ```

2. (Optional) Add sample data:
   ```bash
   # Copy the contents of scripts/02-seed-data.sql and run it
   ```

### Demo Credentials

If you run the seed data, you can use these demo accounts:

- **Replacement Doctor**: demo@replacement.com / demo123
- **Employer**: demo@employer.com / demo123  
- **Admin**: admin@medreplace.com / admin123

### Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Troubleshooting

### "DATABASE_URL is not set" Error

This means you need to create a `.env.local` file with your database connection string. See the setup steps above.

### Database Connection Issues

- Make sure your database is running and accessible
- Check that your connection string is correct
- Verify that your database has the required tables (run the schema script)

### Tailwind CSS Not Working

The application uses Tailwind CSS v4. If styles aren't loading:

1. Make sure all dependencies are installed
2. Check that the PostCSS configuration is correct
3. Restart the development server after making changes
