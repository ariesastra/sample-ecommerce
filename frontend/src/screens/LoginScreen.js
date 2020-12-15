import React, { useState, useEffect } from 'react'

// Dependecies
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Containers
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

// STYLE
import { Form, Button, Row, Col } from 'react-bootstrap'

const LoginScreen = ({location, history}) => {
    // Component Level State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    // Props
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault()

        // DISPATCH LOGIN
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>
                        password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                >
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer ? 
                    <Link 
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}
                    > Sing Up</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen