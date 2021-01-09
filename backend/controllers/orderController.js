import asyncHandler from 'express-async-handler'

// dependencies
import Order from '../models/orderModel.js'

// @desc Create New Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice, 
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No Order Items')
    }
    else{
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice, 
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

// @desc GET order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    // GET ID FROM URL, and get User & Email
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not Found !')
    }

})

// @desc UPDATE order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // GET ID FROM URL, and get User & Email
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order Not Found !')
    }

})

// @desc GET user logged order
// @route GET /api/orders/myorders
// @access Private
const getMyOrder = asyncHandler(async (req, res) => {
    // GET ID FROM URL, and get User & Email
    const orders = await Order.find({user: req.user._id})

    res.json(orders)
})

// @desc GET ALL ORDER
// @route GET /api/orders/
// @access Private/ADMIN
const getOrder = asyncHandler(async (req, res) => {
    // GET ID FROM URL, and get User & Email
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

// @desc UPDATE Order to Delivered
// @route PUT /api/orders/:id/deliver
// @access Private/ADMIN
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    // GET ID FROM URL
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order Not Found !')
    }
})

export {
        addOrderItems, 
        getOrderById, 
        updateOrderToPaid,
        getMyOrder,
        getOrder,
        updateOrderToDelivered
}