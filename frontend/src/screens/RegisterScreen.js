import React, { useState, useEffect } from 'react'

// Dependecies
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Containers
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

// STYLE
import { Form, Button, Row, Col } from 'react-bootstrap'

const RegisterScreen = ({location, history}) => {
    // Component Level State
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    // Props
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Password Do Not Match !')
        } else {
            // DISPATCH REGISTER
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Form Register</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
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
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email Address"
                        value={email}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confrim Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                >
                    Sign Up
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already Have an Account ? 
                    <Link 
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}
                    > Sing In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen