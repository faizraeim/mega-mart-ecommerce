# MegaMart E-Commerce Platform

A full-stack e-commerce web application built with React, Express.js, and MongoDB.

## Features

### Frontend
- **Product Browsing**: Browse products by category, search, and view details
- **Shopping Cart**: Add products, adjust quantities, and checkout
- **User Authentication**: Sign up, login, and logout functionality
- **Admin Dashboard**: Manage products and users (admin only)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Backend
- **RESTful API**: Complete CRUD operations for products
- **User Management**: Registration, login with JWT authentication
- **Admin Controls**: Product and user management endpoints
- **MongoDB Integration**: Persistent data storage

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Vite
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd practice
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

#### Server (.env)
Located at `server/.env`:

```env
PORT=3001

# Database connection
MONGODB_URI=mongodb://localhost:27017/megamart_db

# JWT Secret (change in production!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# CORS origins (comma-separated)
CORS_ORIGINS=http://localhost:5173

# Site configuration
SITE_NAME=MegaMart
ADMIN_EMAIL=admin@megamart.com
ADMIN_PASSWORD=admin123
```

#### Client (.env)
Located at `client/.env`:

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=MegaMart
VITE_APP_URL=http://localhost:5173
```

### Running the Application

1. **Start the server** (from `server` directory):
   ```bash
   npm run dev
   ```

2. **Start the client** (from `client` directory):
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Production Deployment

### Generating a Secure JWT_SECRET

Generate a secure random string for production:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -hex 64
```

### Deploying Backend to Production

1. **Set environment variables on your hosting platform** (Railway, Render, Heroku, etc.):
   ```
   PORT=3001
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=<generated-secure-key>
   CORS_ORIGINS=https://your-frontend-domain.com
   SITE_NAME=MegaMart
   ADMIN_EMAIL=admin@yourdomain.com
   ADMIN_PASSWORD=<secure-admin-password>
   ```

2. **Build and start**:
   ```bash
   cd server
   npm run build  # If using TypeScript, otherwise skip
   npm start
   ```

### Deploying Frontend to Production

1. **Update client/.env** for production:
   ```env
   VITE_API_URL=https://your-backend-domain.com/api
   VITE_APP_NAME=MegaMart
   VITE_APP_URL=https://your-frontend-domain.com
   ```

2. **Build for production**:
   ```bash
   cd client
   npm run build
   ```

3. **Deploy** the `dist` folder to Vercel, Netlify, or your hosting provider.

### Important Production Notes

1. **JWT_SECRET**: Generate a new secure key for production. Never use the default development key.

2. **MongoDB**: Use MongoDB Atlas or a managed MongoDB service for production.

3. **CORS**: Update `CORS_ORIGINS` to include your production frontend domain.

4. **Admin Login**: After deployment, log out and log back in to get a new token with the production JWT_SECRET.

5. **Database Seeding**: The admin user is only created on first startup if no admin exists. Change admin credentials directly in your database or update the .env and restart.

### Default Admin Credentials
- **Email**: admin@megamart.com (or as set in .env)
- **Password**: admin123 (or as set in .env)

## Project Structure

```
practice/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions and hooks
│   │   ├── data/           # Static data and constants
│   │   └── App.jsx         # Main App component
│   └── .env                # Client environment variables
│
├── server/                 # Express.js backend
│   ├── src/
│   │   ├── controller/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── server.mjs      # Server entry point
│   └── .env                # Server environment variables
│
└── README.md
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/filter` | Filter products |
| GET | `/api/product/:id` | Get product by ID |
| POST | `/api/product` | Create product |
| PUT | `/api/update/product/:id` | Update product |
| DELETE | `/api/delete/product/:id` | Delete product |

### Users (Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| DELETE | `/api/users/:id` | Delete user |

## Environment Variables

### Server Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `CORS_ORIGINS` | Allowed CORS origins | localhost:5173 |
| `SITE_NAME` | Application name | MegaMart |
| `ADMIN_EMAIL` | Initial admin email | admin@megamart.com |
| `ADMIN_PASSWORD` | Initial admin password | admin123 |

### Client Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | /api |
| `VITE_APP_NAME` | Application name | MegaMart |
| `VITE_APP_URL` | Frontend URL | http://localhost:5173 |

## Features in Development

- [ ] Orders management dashboard
- [ ] Payment integration
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking

## License

ISC

---

Developed by [Faizey](https://faizraeim.github.io/)
