const { route } = require("./userRouter")
const ProductController = require ('../controller/product')

const router = require("express").Router()

router.get('/test', (req, res) => {
    res.send("Hello, it is route product")
})

router.get('/', ProductController.getAll)

router.post('/register', ProductController.register)

router.get('/getShop/:id', ProductController.getShop)

router.delete('/delete/:id', ProductController.delete)

router.get('/:id', ProductController.getOne)



module.exports = router
