import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import {
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  Input,
  FormGroup,
} from 'reactstrap'
import Rating from '../components/Rating'
import { getProductById } from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductDetails = () => {
  let { id } = useParams()
  const history = useHistory()

  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()
  const { loading, product, error } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProductById(id))
  }, [id])

  const showInStockQty = () => {
    let qtt = []
    for (let i = 0; i < product.countInStock; i++) {
      qtt.push(<option key={i + 1}>{i + 1}</option>)
    }
    return qtt.map((value, key) => {
      return value
    })
  }

  const addToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`)
  }

  if (loading) return <Loader />
  if (error) return <Message variant='danger' children={error} />

  console.log(qty)

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md='6'>
          <img src={product.image} className='img-fluid' alt='product' />
        </Col>
        <Col md='3'>
          <ListGroup flush>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>
              <p>Description: {product.description}</p>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md='3'>
          <ListGroup>
            <ListGroupItem>
              <span className='float-left'>Price:</span>
              <span className='float-right'>${product.price}</span>
            </ListGroupItem>
            <ListGroupItem>
              <span className='float-left'>Status:</span>
              <span className='float-right'>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </span>
            </ListGroupItem>
            {product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                    <FormGroup>
                      <Input
                        type='select'
                        name='selectMulti'
                        id='exampleSelectMulti'
                        onChange={(e) => {
                          setQty(e.target.value)
                        }}
                      >
                        {showInStockQty()}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </ListGroupItem>
            )}
            <ListGroupItem>
              <Button
                color='primary'
                disabled={product.countInStock === 0}
                block={true}
                onClick={addToCart}
              >
                ADD TO CART
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductDetails
