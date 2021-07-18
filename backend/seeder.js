const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const users = require('./data/users')
const products = require('./data/products')
const Product = require('./model/productsModel')
const Order = require('./model/orderModel')
const User = require('./model/userModel')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()

    const createdUser = await User.insertMany(users)
    const adminUser = createdUser[0]._id
    const sampleProduct = products.map((value) => {
      return { ...value, user: adminUser }
    })
    await Product.insertMany(sampleProduct)
    console.log('Data imported'.green.inverse)
  } catch (err) {
    console.log(`${err}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()
    console.log('Data destroyed'.green.inverse)
  } catch (err) {
    console.log(`${err}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  console.log(process.argv)
  destroyData()
} else {
  importData()
}
