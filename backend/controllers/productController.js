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

// @desc Delete a Product
// @route DELETE /api/product/:id
// @access Private & Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({message: 'Product Removed !'})
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

// @desc Delete a Product
// @route POST /api/product
// @access Private & Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name : 'Sample Product',
        price: 0,
        user: req.user._id,
        image:'/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,  
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc Update a Product
// @route PUT /api/product/:id
// @access Private & Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name, 
        price, 
        description, 
        image, 
        brand, 
        category, 
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.desdescription =description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product Not Found !')
    }
})

export {
        getProduct, 
        getProductById, 
        deleteProduct,
        createProduct,
        updateProduct
}