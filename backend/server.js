// IMPORT LIKE FRONTEND JAVASCRIPT
// this is because im using type module on Node
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

// dependencies
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is Running....')
})

app.use('/api/products', productRoutes)

// ERROR HANDLING
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`SERVER running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))