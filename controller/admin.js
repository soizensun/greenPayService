
const SellerMoneyHistory = require('../models/SellerMoneyHistory')
const Order = require('../models/Order')

exports.transferMoney = async (req, res) => {
    try {
        let {shopId, receivedMoney} = req.body

        const newSellerMoneyHistory = new SellerMoneyHistory({shopId, receivedMoney})
        const newObj = await newSellerMoneyHistory.save()

        const a = await Order.updateMany({shopId}, { $set : {isTransfer : true } })

        res.json(newObj)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getOrderForTransfer = async (req, res) => {
    try {
        const orderList = await Order.find({ shopId: req.params.shopId, isTransfer: false })
        res.json(orderList)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}