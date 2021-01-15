import express from 'express'

// DEPENDENCIES
import { 
        getProduct, 
        getProductById,
        deleteProduct,
        updateProduct,
        createProduct,
        createProductReview,
        getTopProducts,
    } from '../controllers/productController.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'

const router = express.Router() 

router.route('/')
        .get(getProduct)
        .post(protect, isAdmin, createProduct)
router.route('/:id')
        .get(getProductById)
        .delete(protect, isAdmin, deleteProduct)
        .put(protect, isAdmin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)

export default router
