const auth = require('../middleware/auth')
const CartController = require ('../controller/cart')

const router = require("express").Router()

router.get('/test', (req, res) => {
    res.send("Hello, it is route cart")
})

router.get('/', CartController.getAll)

router.post('/addProductForDev', CartController.addProductForDev)

router.get('/:userId', CartController.getOne)

router.post('/addAProduct', auth, CartController.addAProduct)

router.post('/confirmCart', auth, CartController.confirmCart)

// router.post('/getOrder', CartController.getOrder)

module.exports = router
