import React, { useEffect } from 'react'

// Dependecies
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

// Containers
import Message from '../components/Message'
import Loader from '../components/Loader'
import { 
        listProducts, 
        productDelete, 
        productCreate,
} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

// STYLE
import { Table, Button, Row, Col } from 'react-bootstrap'

const ProductListScreen = ({history, match}) => {
    const dispatch = useDispatch()
    
    // get data from state
    const productList = useSelector(state => state.productList)
    // Destructure
    const {
            loading, 
            error, 
            products
    } = productList

    const deleteProduct = useSelector(state => state.deleteProduct)
    // Destructure
    const {
            loading: loadingDelete, 
            error: errorDelete, 
            success: successDelete
    } = deleteProduct

    const createProduct = useSelector(state => state.productCreate)
    // Destructure
    const {
            loading: loadingCreate, 
            error: errorCreate, 
            success: successCreate,
            product: createdProduct,
    } = createProduct
    
    const updateProduct = useSelector((state) => state.updateProduct)
    const {success: successUpdate} = updateProduct

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    // onClick handler
    const deleteHandler = (id) => {
        if (window.confirm('Are your sure')) {
            // Delete Product
            dispatch(productDelete(id))
        }
    }

    // onClick createProductHandler
    const createProductHandler = () => {
        dispatch(productCreate())
    }

    useEffect(() => {
        dispatch({
            type: PRODUCT_CREATE_RESET
        })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/products/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }
    }, [
        dispatch, 
        history, 
        userInfo, 
        successDelete,
        createdProduct,
        successCreate
    ])

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {/* delete dependencies */}
            { loadingDelete && <Loader /> }
            { errorDelete && <Message variant='danger'>{errorDelete}</Message> }
            { successDelete && <Message variant='success'>Data Has Been Deleted !</Message> }
            {/* craete dependencies */}
            { loadingCreate && <Loader /> }
            { errorCreate && <Message variant='danger'>{errorCreate}</Message> }
            { successCreate && <Message variant='success'>Data Has Been Created !</Message> }
            { successUpdate && <Message variant='success'>Data Already Updated !</Message> }
            {
                loading ? <Loader /> 
                :error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`} >
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

export default ProductListScreen
