const { route } = require("./userRouter")
const ProductTagController = require ('../controller/productTag')

const router = require("express").Router()

router.post('/register', ProductTagController.register)

router.get('/', ProductTagController.productTag)

router.get('/:tagId', ProductTagController.getById)

module.exports = router
