const { route } = require("./userRouter")
const CartController = require ('../controller/cart')

const router = require("express").Router()

router.get('/test', (req, res) => {
    res.send("Hello, it is route cart")
})

router.get('/', CartController.getAll)

router.post('/addProduct', CartController.addProduct)

router.get('/:userId', CartController.getOne)

module.exports = router
