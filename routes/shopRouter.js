const router = require("express").Router()
const ShopController = require ('../controller/shop')
const auth = require('../middleware/auth')


router.get('/test', (req, res) => {
    res.send("Hello, it is route shop")
})

router.get('/', ShopController.getAll)

router.post('/register', ShopController.register)

router.get('/:id', ShopController.findById)

router.get('/getOrder/:shopId', ShopController.getOrder)

router.get('/closeOrder/:orderId', ShopController.closeOrder)

router.get('/myProducts/:shopId', ShopController.myProducts)

router.get('/myIncome/:shopId' , ShopController.myIncome)

router.post('/updateShop', ShopController.updateShop)

router.delete('/clearIncomeHistory/:shopId', ShopController.clearIncomeHistory)

module.exports = router
