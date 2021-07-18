import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link, useParams, useLocation, useHistory } from 'react-router-dom'
import {
  Row,
  Col,
  ListGroup,
  FormGroup,
  ListGroupItem,
  Input,
  Button,
  Card,
} from 'reactstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'

function Cart() {
  const { id } = useParams()
  const { search } = useLocation()
  const history = useHistory()
  const productId = id ? id : ''
  const qty = search ? Number(search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])
  console.log(cartItems)

  const showInStockQty = (countInStock, qtyy) => {
    let qtt = []
    for (let i = 0; i < countInStock; i++) {
      qtt.push(
        <option selected={qtyy == i + 1 ? true : false} key={i + 1}>
          {i + 1}
        </option>
      )
    }
    return qtt.map((value, key) => {
      return value
    })
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id, history))
  }
  const checkOutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      <Row>
        <Col>
          <h1>SHOPPING CART</h1>
        </Col>
      </Row>
      {cartItems.length > 0 ? (
        <Row>
          <Col>
            <ListGroup flush>
              {cartItems.map((item, value) => {
                return (
                  <>
                    <ListGroupItem key={item.product}>
                      <Row>
                        <Col md='2'>
                          <img
                            className='img-fluid  rounded'
                            src={item.image}
                            alt={item.name}
                          />
                        </Col>
                        <Col md='3'>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md='2'>${item.price}</Col>
                        <Col md='2'>
                          <FormGroup>
                            <Input
                              type='select'
                              name='selectMulti'
                              id='exampleSelectMulti'
                              value={item.qty}
                              onChange={(e) => {
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value)
                                  )
                                )
                              }}
                            >
                              {showInStockQty(item.countInStock, item.qty)}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className='text-center' md='2'>
                          <Button
                            type='button'
                            color='light'
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </>
                )
              })}
            </ListGroup>
          </Col>
          <Col md='4'>
            <Card>
              <ListGroup flush>
                <ListGroupItem>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, curr) => {
                      return acc + curr.qty
                    }, 0)}
                    ) items
                  </h2>
                  $
                  {cartItems
                    .reduce((acc, item) => {
                      return acc + item.qty * item.price
                    }, 0)
                    .toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    type='button'
                    color='primary'
                    className='btn btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkOutHandler}
                  >
                    Procced To Checkout
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Message variant='info'>
              Your Cart is empty{' '}
              <Link
                className='text-info font-weight-bold text-decoration-none'
                to='/'
              >
                Go Back
              </Link>
            </Message>
          </Col>
        </Row>
      )}
    </>
  )
}

export default Cart
