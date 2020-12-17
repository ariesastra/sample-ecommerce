import React, { useState } from 'react'

// Dependecies
import { useDispatch, useSelector } from 'react-redux'

// Components
import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

// Style
import { Form, Button } from 'react-bootstrap'

const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

        // Dispatch Save Shipping Address
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    return <FormContainer md={8}>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler} >
            <Form.Group controlId='address'>
                <Form.Label>
                    Address
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Your Location Address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>
                    City
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Your City"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>
                    Postal Code
                </Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Your Postal Code"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>
                    Your Country
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Your Country"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
                Continue
            </Button>
        </Form>
    </FormContainer>
}

export default ShippingScreen
