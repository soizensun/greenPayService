const Product = require('../models/Product');
const Shop = require('../models/Shop');

exports.getAll = async (req, res) => {
    try {
        const all = await Product.find()
        return res.json(all)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.register = async (req, res) => {
    try {
        let { shopId, name, tagId, price, stock, description, mainPicture, morePicture, greenPrice } = req.body

        if (!shopId || !name || !tagId || !description || !price || !stock || !greenPrice)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })


        const newProduct = new Product({
            shopId,
            name,
            tagId,
            price,
            stock,
            description,
            mainPicture,
            morePicture,
            greenPrice
        });
        const savedProduct = await newProduct.save();
        res.json(savedProduct);

    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
}

exports.getShop = async (req, res) => {
    try {
        const product = await Product.findById( req.params.id )
        const shop = await Shop.findById({_id: product.shopId})

        res.json(shop)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.delete = async (req, res) => {
    try {
        const product = await Product.findById( req.params.id )
        const deletedProduct = await Product.findByIdAndDelete(product)
        res.json(deletedProduct)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getOne = async (req, res) => {
    try {
        const product = await Product.findById( req.params.id )

        res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}