const Cart = require('../models/Cart');
const User = require('../models/User');

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
        // console.log(userId);
        // console.log(productId);
        // console.log(amount);
        const user = await User.findById(req.user)

        let tmpObject = {}

        const product = await Product.findById(productId)
        const shop = await Shop.findById({ _id: product.shopId })

        tmpObject.productId = productId
        tmpObject.shopId = shop._id
        tmpObject.amount = amount

        const cart = await Cart.findOne({ userId: user._id })
        if (cart) {
            let isAdd = false
            const cart1 = await Cart.findOne({ userId: user._id })

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

            const ovewrited = await cart1.overwrite({ userId : user._id, product: cloneArray })
            const updatedCart = await ovewrited.save();

            return res.json(updatedCart)
        }
        else {

            const newUserCart = new Cart({
                userId: user._id,
                product: [tmpObject]
            });

            const newCart = await newUserCart.save()
            return res.json(newCart)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}
