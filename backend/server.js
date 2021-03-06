// IMPORT LIKE FRONTEND JAVASCRIPT
// this is because im using type module on Node
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import morgan from 'morgan'

// dependencies
import connectDB from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

// Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoute from './routes/orderRoutes.js'
import uploadRoute from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log('for morgan');
}

// FOR ALLOWING JSON DATA IN BODY [for postman post purpose]
app.use(express.json())

// routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/users/profile', userRoutes)
app.use('/api/orders', orderRoute)

// PAYPAL
app.use('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// UPLOAD
app.use('/api/upload', uploadRoute)
// MAKE FOLDER UPLOADS READABLE BY NODEJS
const __dirname = path.resolve() //mimic for readable by nodejs
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// PRODUCTION METHOD
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}
else{
    app.get('/', (req, res) => {
        res.send('API is Running....')
    })
}

// ERROR HANDLING
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`SERVER running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))