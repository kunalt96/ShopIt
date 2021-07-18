const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(
      `Mongodb connected ${connection.connection.host}`.cyan.underline
    )
  } catch (err) {
    console.log(`Error is ${err.message}`.red.underline.bold)
    process.exit(1)
  }
}
module.exports = connectDB
