const Cart = require('../models/Cart');

exports.getAll = async (req, res) => {
    try {
        const all = await Cart.find()
        return res.json(all)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.addProduct = async (req, res) => {
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

        if (!newOne){
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
        const userCart = await Cart.findOne( {userId : req.params.userId} )

        return res.json(userCart)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}