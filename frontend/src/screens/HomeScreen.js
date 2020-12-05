import React, {useState, useEffect} from 'react'

// Dependencies
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'

// Component
import Product from '../components/Product'

// Style

const HomeScreen = () => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const {data} = await axios.get('/api/products')

            setProduct(data)
        }

        fetchProduct()
    }, [])

    return (
        <>
            <h1>Latest Products</h1>   
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
