
const SellerMoneyHistory = require('../models/SellerMoneyHistory')
const Order = require('../models/Order')
const Shop = require('../models/Shop')

exports.transferMoney = async (req, res) => {
    try {
        let {shopId, receivedMoney} = req.body

        
        if (!shopId || !receivedMoney)
            return res
                .status(400)
                .json({ msg: "Not all importance fields have been entered." })

        const newSellerMoneyHistory = new SellerMoneyHistory({shopId, receivedMoney})
        const newObj = await newSellerMoneyHistory.save()

        const a = await Order.updateMany({shopId}, { $set : {isTransfer : true } })

        const shop = await Shop.findById(shopId)
        let totalMoney = shop.totalMoney + receivedMoney
        await Shop.findByIdAndUpdate(shopId, {totalMoney})

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

exports.confirmShop = async (req, res) => {
    try {
        let { status, shopId } = req.body

        await Shop.findByIdAndUpdate(shopId, {isActivate: status})
        const shop = await Shop.find()
        res.json(shop)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteShop = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.shopId)
        if(!shop.isActivate) 
            await Shop.findByIdAndDelete(req.params.shopId)

        const allShop = await Shop.find()
        res.json(allShop)
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}