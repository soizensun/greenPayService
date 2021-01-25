const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.json({
    message: 'server is OK!!'
  })
})

app.use('/users', require('./routes/userRouter'))

app.use('/shops', require('./routes/shopRouter'))

app.use('/products', require('./routes/productRouter'))

app.use('/carts', require('./routes/cartRouter'))

app.use('/projects', require('./routes/projectRouter'))

app.use('/addresses', require('./routes/addressRouter'))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
},
(err) => {
  if(err) throw err;
  console.log("connentioning MongoDB cloud");
})
