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
        let { name, tagId, description, logo, ownerId, shipping } = req.body

        if (!name || !tagId || !description || !ownerId || !shipping)
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
            ownerId,
            shipping
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

        order.products.map(async product => {
            const productDetail = await Product.findById(product.productId)

            if (product.amount <= productDetail.stock) {
                const newProduct = await Product.update(
                    { _id: productDetail._id },
                    {
                        $set: { stock: productDetail.stock - product.amount }
                    })
            }
        })

        await Order.findByIdAndUpdate(req.params.orderId, {isCloseOrder: true})

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


