const Cart = require('../models/Cart');
const Project = require('../models/Project')
const Order = require('../models/Order')
const Product = require('../models/Product')

exports.getAll = async (req, res) => {
    try {
        const all = await Cart.find()
        return res.json(all)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.addProductForDev = async (req, res) => {
    try {
        let { userId, product } = req.body

        if (!userId || !product)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })


        const newUserCart = new Cart({
            userId,
            product
        });

        const newOne = await Cart.findOneAndUpdate({ userId }, { product })

        if (!newOne) {
            const savedUserCart = await newUserCart.save();
            return res
                .status(200)
                .json({ msg: "create new user's cart" })
        }
        else
            return res
                .status(200)
                .json({ msg: "update user's cart" })


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getOne = async (req, res) => {
    try {
        const userCart = await Cart.findOne({ userId: req.params.userId })

        return res.json(userCart)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.addAProduct = async (req, res) => {
    try {
        const { productId, amount } = req.body
        // const user = await User.findById(req.user)

        let tmpObject = {}

        const product = await Product.findById(productId)
        const shop = await Shop.findById({ _id: product.shopId })

        tmpObject.productId = productId
        tmpObject.shopId = shop._id
        tmpObject.amount = amount

        const cart = await Cart.findOne({ userId: req.user })
        if (cart) {
            let isAdd = false
            const cart1 = await Cart.findOne({ userId: req.user })

            let cloneArray = [...cart.product]

            cart.product.forEach((p, index) => {
                if (p.productId == productId) {
                    const total = cart.product[index].amount + amount
                    if (total <= 0) cloneArray.splice(index, 1)
                    else cloneArray[index].amount = total
                    isAdd = true
                }
            })
            if (!isAdd) {
                cloneArray.push(tmpObject)
            }

            const ovewrited = await cart1.overwrite({ userId: req.user, product: cloneArray })
            const updatedCart = await ovewrited.save();

            return res.json(updatedCart)
        }
        else {

            const newUserCart = new Cart({
                userId: req.user,
                product: [tmpObject]
            });

            const newCart = await newUserCart.save()
            return res.json(newCart)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


exports.confirmCart = async (req, res) => {

    try {
        let { projectId, budget } = req.body

        // add budget to project
        let project = await Project.findById(projectId)
        
        let newBudget = budget + project.budget

        let updatedProject = await Project.updateOne({ _id: projectId }, { budget: newBudget })

        // get cart and add to Order
        let userCart = await Cart.findOne({ userId: req.user })
        let shopList = []

        userCart.product.map(product => {
            if (!shopList.includes(product.shopId.toString())) {
                shopList.push(product.shopId.toString())
            }
        })

        let tmpObj = {}
        shopList.map(async shop => {
            let tmpArray = []
            userCart.product.map(async product => {
                if (product.shopId.toString() == shop) tmpArray.push(product)
            })
            tmpObj.products = tmpArray
            tmpObj.shopId = shop
            tmpObj.userId = req.user

            const newOrder = new Order(tmpObj);
            const savedOrder = await newOrder.save();
        })

        userCart.product.map(async product => {
            const productDetail = await Product.findById(product.productId)

            if (product.amount <= productDetail.stock) {
                const newProduct = await Product.update(
                    { _id: productDetail._id },
                    {
                        $set: { stock: productDetail.stock - product.amount }
                    })
            }
        })

        // delete cart
        const deletedCart = await Cart.findByIdAndDelete(userCart._id)
        res.json(deletedCart)


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
