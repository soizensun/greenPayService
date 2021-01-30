const { route } = require("./userRouter")
const ProductTagController = require ('../controller/productTag')

const router = require("express").Router()

router.post('/register', ProductTagController.register)

router.get('/', ProductTagController.productTag)

module.exports = router
