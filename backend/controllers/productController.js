import asyncHandler from 'express-async-handler'

// dependencies
import Product from '../models/productModel.js'

// @desc Fetch all product
// @route GET /api/product
// @access Public
const getProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // testing error
    // res.status(401)
    // throw new Error('Not Authorized !')
    
    res.json(products)
})

// @desc Fetch single product
// @route GET /api/product/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

export {getProduct, getProductById}