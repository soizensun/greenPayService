const { route } = require("./userRouter")
const ShopController = require ('../controller/shop')

const router = require("express").Router()

router.get('/test', (req, res) => {
    res.send("Hello, it is route shop")
})

router.get('/', ShopController.getAll)

router.post('/register', ShopController.register)

module.exports = router
