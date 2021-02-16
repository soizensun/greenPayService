const Shop = require('../models/Shop')
const Order = require('../models/Order')
const Product = require('../models/Product')
const SellerMoneyHistory = require('../models/SellerMoneyHistory')
// const e = require('express')

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
        let { name, tagId, description, logo, ownerId, shipping, totalMoney, promptpayNumber, accountName } = req.body

        if (!name || !tagId || !description || !ownerId || !shipping || !totalMoney || !promptpayNumber || !accountName)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })

        const shop = await Shop.findOne({ name })
        if (shop)
            return res
                .status(400)
                .json({ msg: "Duplicate shop name." })

        const shopDup = await Shop.findOne({ ownerId })
        if (shopDup)
            return res
                .status(400)
                .json({ msg: "Duplicate shop owner." })

        const newShop = new Shop({
            name,
            tagId,
            description,
            logo,
            ownerId,
            shipping,
            totalMoney,
            promptpayNumber,
            accountName
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

exports.getOrder = async (req, res) => {
    try {
        const orderList = await Order.find({ shopId: req.params.shopId, isCloseOrder: false })
        res.json(orderList)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.closeOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)

        await Order.findByIdAndUpdate(req.params.orderId, { isCloseOrder: true })

        const orderList = await Order.find({ shopId: order.shopId, isCloseOrder: false })
        res.json(orderList)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.myProducts = async (req, res) => {
    try {
        const productList = await Product.find({ shopId: req.params.shopId })
        res.json(productList.reverse())
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.myIncome = async (req, res) => {
    try {
        const sellerMoneyHistoryList = await SellerMoneyHistory.find({ shopId: req.params.shopId })
        res.json(sellerMoneyHistoryList)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateShop = async (req, res) => {
    try {
        let { _id, name, description, logo, accountName, promptpayNumber } = req.body

        let updatedShop = await Shop.updateOne({ _id },
            {
                name,
                description,
                logo,
                accountName,
                promptpayNumber
            })

        res.json(updatedShop)
    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
}

exports.clearIncomeHistory = async (req, res) => {
    try {
        await SellerMoneyHistory.deleteMany({ shopId: req.params.shopId })
        const sellerMoneyHistoryList = await SellerMoneyHistory.find({ shopId: req.params.shopId })
        res.json(sellerMoneyHistoryList)
    } catch (error) {
        res.status(500).json({ error: error.massage })
    }
}

