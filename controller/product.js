const Product = require('../models/Product');
const Shop = require('../models/Shop');



exports.register = async (req, res) => {
    try {
        let { shopId, name, tag, description, mainPicture, morePicture } = req.body

        if (!shopId || !name || !tag || !description)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })


        const newProduct = new Product({
            shopId,
            name,
            tag,
            description,
            mainPicture,
            morePicture
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