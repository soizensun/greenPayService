const Shop = require('../models/Shop')


exports.getAll = async (req, res) => {
    try {
        const all = await Shop.find()
        return res.json(all)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.register = async (req, res) => {
    try {
        let { name, tagId, description, logo, ownerId } = req.body

        if (!name || !tagId || !description || !logo || !ownerId)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })

        const shop = await Shop.findOne({ name })
        if (shop)
            return res
                .status(400)
                .json({ msg: "Duplicate shop name." })

        const newShop = new Shop({
            name,
            tagId,
            description,
            logo,
            ownerId
        });
        const savedShop = await newShop.save();
        res.json(savedShop);

    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
}

exports.findById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id)

        res.json(shop)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}