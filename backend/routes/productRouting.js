const express = require('express')
const router = express.Router()
const {
  getProductById,
  getProducts,
} = require('../controller/productController')

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

module.exports = router
