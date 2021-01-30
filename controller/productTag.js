const ProductTag = require('../models/ProductTag')

exports.register = async (req, res) => {
    try {
        let { name } = req.body

        const newProductTag = new ProductTag({ name });
        const savedProductTag = await newProductTag.save();
        res.json(savedProductTag);

    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
}

exports.productTag = async (req, res) => {
    try {
        const productTagList = await ProductTag.find()
        return res.json(productTagList)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}