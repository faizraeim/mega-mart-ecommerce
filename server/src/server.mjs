import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Product from './models/productModel.mjs';
import route from './routes/productRoute.js';
import authRoute from './routes/authRoute.mjs';
import userRoute from './routes/userRoute.mjs';
import User from './models/userModel.mjs';

// Load environment variables from .env file
dotenv.config();

const app = express();

const corsOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:5173'];
app.use(cors({
  origin: corsOrigins,
  credentials: true,
}));
app.use(express.json());

// Parse JSON bodies
app.use(express.json());

// connect to mongodb
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedAdmin();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

// server port number coming from .env file or fallback
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// api response to be send when accessing root route
app.get('/', (request, response) => {
  response.status(200).send('Welcome to MegaMart Server');
});

// Using controller for routes instead of writing all here
app.use("/api", route);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

// Seed admin user
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        email: process.env.ADMIN_EMAIL || 'admin@megamart.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin',
      });
      await admin.save();
      console.log(`Admin user seeded: ${process.env.ADMIN_EMAIL || 'admin@megamart.com'} / ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

// GET all products (optionally filtered by query ?filter=field&value=text)
// app.get('/api/products', async (request, response) => {
//   try {
//     const { filter, value } = request.query;

//     // No filter: return all products
//     if (!filter && !value) {
//       const all = await Product.find({});
//       return response.send({ products: all, total: all.length });
//     }

//     // Filter and value provided
//     if (filter && value) {
//       // Simple text search on single field
//       const query = {
//         [filter]: { $regex: value, $options: 'i' },
//       };

//       const filtered = await Product.find(query);
//       return response.send({ products: filtered, total: filtered.length });
//     }

//     return response.status(400).send({
//       error: 'Both filter and value are required for filtering',
//     });
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     return response.status(500).send({ error: 'Server error' });
//   }
// });


// POST data to database {error: fix it}
// app.post('/api/products', (request, response) => {
//   console.log(request.body)
//   const {body} = request;
//   const newProduct = {id: Product[Product.length -1 ].id + 1, ...body}
//   Product.send(newProduct);
//   return response.status(201).send(newProduct)
// })



// GET single product by numeric id (not _id)
// app.get('/api/products/:id', async (request, response) => {
//   try {
//     const parsedID = parseInt(request.params.id, 10);
//     if (isNaN(parsedID)) {
//       return response.status(400).send({ message: 'Bad Request. Invalid ID' });
//     }

//     const product = await Product.findOne({ id: parsedID });
//     if (!product) {
//       return response.sendStatus(404);
//     }
//     return response.send(product);
//   } catch (err) {
//     console.error('Error fetching product:', err);
//     return response.status(500).send({ error: 'Server error' });
//   }
// });