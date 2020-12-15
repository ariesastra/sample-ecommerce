import asyncHandler from 'express-async-handler'

// dependencies
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc Auth User & get Token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else{
        // STATUS UNAUTHORIZED
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

// @desc GET USER PROFILE
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    let user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        // STATUS NOT FOUND
        res.status(404)
        throw new Error('Profile Not Found !')
    }
})

// @desc Register a New User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    const userExists = await User.findOne({email})

    if (userExists) {
        // STATUS BAD REQUEST
        res.status(400)
        throw new Error('Email Already Used !')   
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        // RESPONSE WITH CREATED
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        //BAD REQUEST
        res.status(400)
        throw new Error('Invalid User Data !')
    }
})

// @desc Update User Profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    let user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        // STATUS NOT FOUND
        res.status(404)
        throw new Error('Profile Not Found !')
    }
})

export {authUser, getUserProfile, registerUser, updateUserProfile}