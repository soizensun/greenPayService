const { route } = require("./userRouter")
const ProductController = require ('../controller/product')

const router = require("express").Router()

router.get('/test', (req, res) => {
    res.send("Hello, it is route product")
})

// router.get('/', ProductController.getAll)

router.post('/register', ProductController.register)

router.post('/getShop/:id', ProductController.getShop)

router.delete('/delete/:id', ProductController.delete)



module.exports = router
