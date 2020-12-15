import React, {useState, useEffect} from 'react'

// Dependecies
import { useDispatch, useSelector } from 'react-redux'

// Containers
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetail, updateUserProfile } from '../actions/userActions'

// STYLE
import { Form, Button, Row, Col } from 'react-bootstrap'

const ProfileScreen = ({history}) => {
    // Component Level State
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetail = useSelector(state => state.userDetail)
    const {loading, error, user} = userDetail
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        else{
            if (!user.name) {
                dispatch(getUserDetail('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user])

    const submitHandler = (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Password Do Not Match !')
        } else {
            // DISPATCH UPADTE PROFILE
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }

    return <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
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
                    Update Profile
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
}

export default ProfileScreen
