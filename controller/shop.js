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
        let { name, tag, description, logo, ownerId } = req.body

        if (!name || !tag || !description || !logo || !ownerId)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })


        const newShop = new Shop({
            name,
            tag,
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