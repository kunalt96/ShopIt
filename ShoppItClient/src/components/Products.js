import React from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Products = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <CardImg src={product.image} top />
      </Link>
      <CardBody>
        <Link to={`/product/${product._id}`}>
          <CardTitle tag='div'>
            <strong>{product.name}</strong>
          </CardTitle>
        </Link>
        <CardText tag='div' className='my-3'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </CardText>
        <CardText tag='h4'>${product.price}</CardText>
      </CardBody>
    </Card>
  )
}

export default Products
