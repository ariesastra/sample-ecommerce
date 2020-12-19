import React, { useState, useEffect } from 'react'

// Dependecies
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


// Components
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getOrderDetails} from '../actions/orderActions'

// Style
import { Button, Row, Col, ListGroupItem, ListGroup, Image, Card } from 'react-bootstrap'

const OrderScreen = ({match}) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    // GRAB PLACE ORDER DETAIL
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    if (!loading) {
        // Create 2 Deciaml Number after to be fix event value is 0
        const addDecimals = (num) => {
            return (
                Math.round(num * 100) / 100 
            ).toFixed(2)
        }

        order.itemsPrice = addDecimals(order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty, 
            0
        ))
    }

    // CHECKING ORDER
    useEffect(() => {
        if(!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }
    }, [order, orderId]) 

    return loading 
            ? <Loader /> 
            : error 
            ? <Message variant='danger' >{error}</Message>
            : <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Shipping</h2>
                                <p><strong>Name :</strong>{order.user.name}</p>
                                <p><a href={`mailto: ${order.user.email}`}>{order.user.email}</a></p>
                                <p>
                                    <strong>Address</strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {
                                    order.isDeliverd 
                                    ? <Message variant='success' >Delivered on {order.deliveredAt}</Message>
                                    : <Message variant='danger' >Not Delivered</Message>
                                }
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {
                                    order.isPaid 
                                    ? <Message variant='success' >Paid on {order.paidAt}</Message>
                                    : <Message variant='danger' >Not Paid</Message>
                                }
                            </ListGroupItem>
                            <ListGroupItem>
                                <h3>Order Items</h3>
                                {
                                    order.orderItems.length === 0 
                                    ? <Message>Your Order is Empty</Message>
                                    : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroupItem key={index}>
                                                    <Row>
                                                        <Col md={2}>
                                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                    )
                                }
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h2>Order Summary</h2>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    {error && <Message variant='danger'>{error}</Message>}
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
}

export default OrderScreen
