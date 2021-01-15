import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to Shopyey',
    description: 'Kami Menjual product dengan review terbaik',
    keywords: 'review, product review, product dengan review terbaik'
}

export default Meta
