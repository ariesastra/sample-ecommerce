import React, { useState, useEffect } from 'react'

// Dependecies
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Containers
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetail, productUpdate } from '../actions/productActions'

// STYLE
import { Form, Button, } from 'react-bootstrap'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({match, history}) => {
    // GET VARIABLE FROM URL
    const productId = match.params.id

    // Component Level State
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetail = useSelector((state) => state.productDetail)
    const {loading, error, product} = productDetail

    const updateProduct = useSelector((state) => state.updateProduct)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = updateProduct

    useEffect(() => {
        if (successUpdate) {
            dispatch({
                type: PRODUCT_UPDATE_RESET
            })
            history.push('/admin/productlist')
        }
        else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetail(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [ dispatch, history, product, productId, successUpdate ])

    const submitHandler = (event) => {
        event.preventDefault()
        // UPDATE PRODUCT
        dispatch(productUpdate({
            _id: productId, 
            name, 
            price, 
            image, 
            brand, 
            category, 
            description, 
            countInStock
        }))
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1> 
                { loadingUpdate && <Loader /> }
                { errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {
                    loading 
                    ? <Loader /> 
                    : error 
                    ? <Message variant='danger'>{error}</Message> 
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>
                                    Name
                                </Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Your Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>
                                    Price
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>
                                    Image
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Image URL"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='brand'>
                                <Form.Label>
                                    Brand
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='category'>
                                <Form.Label>
                                    Category
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='countInStock'>
                                <Form.Label>
                                    Stock
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Count In Stock"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label>
                                    Description
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="primary"
                            >
                                Update
                            </Button>
                        </Form>
                    )
                }
            </FormContainer>
        </>
    )
}

export default ProductEditScreen