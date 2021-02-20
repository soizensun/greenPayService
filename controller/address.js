const Address = require('../models/Address')

exports.getAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id)

        return res.json(address)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

