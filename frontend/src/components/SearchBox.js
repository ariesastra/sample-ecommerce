import React, {useState} from 'react'

// Style
import {Form, Button} from 'react-bootstrap'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control 
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Product Name'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button variant='success' type='submit' className='p-2'>Submit</Button>
        </Form>
    )
}

export default SearchBox
