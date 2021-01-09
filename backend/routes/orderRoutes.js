import express from 'express'

// DEPENDENCIES
import { 
        addOrderItems,
        getOrderById,
        updateOrderToPaid,
        getMyOrder,
        getOrder,
        updateOrderToDelivered
} from '../controllers/orderController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router() 

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrder)
router.route('/myorders').get(protect, getMyOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered)

export default router
