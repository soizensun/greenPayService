const auth = require('../middleware/auth')
const AdminController = require ('../controller/admin')
const { route } = require('./shopRouter')

const router = require("express").Router()

router.get('/test', (req, res) => {
    res.send("Hello, it is route admin")
})

router.post('/transferMoney', AdminController.transferMoney)

router.get('/getOrderForTransfer/:shopId', AdminController.getOrderForTransfer)

router.post('/confirmShop', AdminController.confirmShop)

router.post('/deleteShop/:shopId', AdminController.deleteShop)

module.exports = router
