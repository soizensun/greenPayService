const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 4000

// app.get('/index', (req, res) => {
//   res.json({
//     message: 'OK'
//   })
// })

// app.get('*', (req, res) => {
//   res.json({
//     message: 'WoW'
//   })
// })

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
},
(err) => {
  if(err) throw err;
  console.log("connention established");
})


app.use('/users', require('./routes/userRouter'))