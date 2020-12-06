import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Dependencies
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'

// Component
import Rating from '../components/Rating'
import {listProductDetail} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

// Style

const ProductScreen = ({match}) => {
    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetail)
    const {loading, error, product} = productDetail

    useEffect(() => {
        dispatch(listProductDetail(match.params.id))

    }, [match, dispatch])

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {
                loading 
                ? <Loader /> 
                : error 
                ? <Message variant='danger'>{error}</Message>
                : (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating 
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroupItem>
                                    Price : ${product.price}
                                </ListGroupItem>
                                <ListGroupItem>
                                    Description : {product.description}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroup.Item>
                                        <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )
            }
        </>
    )
}

export default ProductScreen
