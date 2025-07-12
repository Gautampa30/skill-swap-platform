# Backend for Skill Swap Platform

This is the backend for the Skill Swap Platform. It uses Node.js, Express.js, Prisma ORM (with SQLite), JWT authentication, and Cloudinary for image uploads.

## Features
- User registration/login (JWT)
- Profile management (skills, availability, privacy, photo)
- Search/browse users by skill
- Swap requests (send/accept/reject/delete)
- Ratings & feedback
- Admin dashboard (moderation, user management, CSV export, announcements)

## Getting Started
1. `npm install`
2. Set up environment variables (see `.env.example`)
3. `npx prisma migrate dev --name init`
4. `npm run dev`

## License
MIT
