import express from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

// Dependencies
import userModel from '../models/userModel.js'

const protect = asyncHandler( async(req, res, next) => {
    let token
    
    if(
        req.headers.authorization 
        && req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await userModel.findById(decoded.id).select('--password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Unauthorized, Token Failed !')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Unauthorized !')
    }

})

export {protect}