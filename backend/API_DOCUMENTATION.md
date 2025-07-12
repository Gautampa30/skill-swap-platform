# Skill Swap Platform API Documentation

## Base URL
`http://localhost:5000`

## Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 1. Authentication APIs

### Register User
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "location": "New York"
}
```
- **Response:** `201 Created`

### Login User
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "isAdmin": false
  }
}
```

---

## 2. User Profile & Skills APIs

### Get Current User Profile
- **GET** `/api/user/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** User profile object

### Update Current User Profile
- **PUT** `/api/user/me`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "Updated Name",
  "location": "Updated Location",
  "photoUrl": "https://example.com/photo.jpg"
}
```

### Add Skill to Offered List
- **POST** `/api/user/me/skills-offered`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "JavaScript"
}
```

### Remove Skill from Offered List
- **DELETE** `/api/user/me/skills-offered`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "JavaScript"
}
```

### Add Skill to Wanted List
- **POST** `/api/user/me/skills-wanted`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "Python"
}
```

### Remove Skill from Wanted List
- **DELETE** `/api/user/me/skills-wanted`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "Python"
}
```

### Update Availability
- **PUT** `/api/user/me/availability`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "availability": "Weekends, Evenings"
}
```

### Set Profile Privacy
- **PUT** `/api/user/me/privacy`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "isPublic": true
}
```

### Get User Profile (Public)
- **GET** `/api/user/:id`
- **Response:** Public user profile

### Search Users
- **GET** `/api/user?skill=JavaScript&type=offered`
- **GET** `/api/user?skill=Python&type=wanted`
- **GET** `/api/user?availability=weekends`

### Get User Feedback
- **GET** `/api/user/:id/feedback`
- **Response:** Array of feedback for the user

---

## 3. Swap Request APIs

### Create Swap Request
- **POST** `/api/swap`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "receiverId": "user-id",
  "skillsOffered": "JavaScript, React",
  "skillsWanted": "Python, Django",
  "message": "I can help with JavaScript in exchange for Python help"
}
```

### Get My Swaps
- **GET** `/api/swap/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Array of swaps involving current user

### Update Swap Status
- **PUT** `/api/swap/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "action": "accept"  // or "reject" or "delete"
}
```

### Submit Feedback
- **POST** `/api/swap/:id/feedback`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "rating": 5,
  "comment": "Great swap experience!"
}
```

---

## 4. Admin APIs

### Get All Users
- **GET** `/api/admin/users`
- **Headers:** `Authorization: Bearer <admin-token>`

### Ban/Unban User
- **PUT** `/api/admin/users/:id/ban`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:**
```json
{
  "ban": true
}
```

### Get All Swaps
- **GET** `/api/admin/swaps`
- **Headers:** `Authorization: Bearer <admin-token>`

### Get All Feedback
- **GET** `/api/admin/feedback`
- **Headers:** `Authorization: Bearer <admin-token>`

### Send Platform Message
- **POST** `/api/admin/message`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:**
```json
{
  "message": "Platform maintenance scheduled for tomorrow"
}
```

### Download Reports
- **GET** `/api/admin/report`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Response:** JSON with users, swaps, and feedback data

---

## 5. Utility APIs

### Health Check
- **GET** `/`
- **Response:**
```json
{
  "message": "Skill Swap Platform API",
  "version": "1.0.0",
  "status": "running"
}
```

---

## Testing Guide

### 1. Test Authentication
1. Register a new user
2. Login and save the JWT token
3. Test protected endpoints with the token

### 2. Test User Profile
1. Get current user profile
2. Update profile information
3. Add/remove skills from offered/wanted lists
4. Update availability and privacy settings

### 3. Test Swap Functionality
1. Search for users by skills
2. Create a swap request
3. View your swaps
4. Accept/reject swap requests
5. Submit feedback after completed swaps

### 4. Test Admin Features
1. Login as admin (use admin credentials)
2. View all users, swaps, and feedback
3. Ban/unban users
4. Download reports

### Default Admin Credentials
- Email: `admin@skillswap.com`
- Password: `admin123`

---

## Error Responses

All endpoints return consistent error responses:
```json
{
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error 