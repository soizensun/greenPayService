const router = require("express").Router()
const auth = require('../middleware/auth')
const User = require('../models/User')

const UserController = require ('../controller/user')

router.get('/test', (req, res) => {
    res.send("Hello, it is working")
})

router.post("/register", UserController.register)

router.post('/login', UserController.login)

router.delete("/delete", auth, UserController.delete)

router.post("/tokenIsValid", UserController.tokenIsValid)

router.get("/get/:id", UserController.findById)

router.get("/", UserController.getAll)

module.exports = router