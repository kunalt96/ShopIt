import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import Products from '../components/Products'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector((state) => state.productList)

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  if (loading)
    return (
      <>
        <Loader />
      </>
    )
  if (error)
    return (
      <>
        <Message variant='danger' children={error} />
      </>
    )

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((value, key) => {
          return (
            <Col sm='12' md='6' lg='4' xl='3' key={value._id}>
              <Products product={value} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default HomeScreen
