const bcrypt = require("bcryptjs");
const User = require('../models/User')
const Address = require('../models/Address')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const Shop = require("../models/Shop");

const client = new OAuth2Client("1068628232562-qm0ssc22ls4ks62jcopg1frqbdau8jau.apps.googleusercontent.com")

exports.getAll = async (req, res) => {
    try {
        const all = await User.find()
        return res.json(all)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.register = async (req, res) => {
    try {
        let { email, password, passwordCheck, displayName } = req.body

        if (!email || !password || !passwordCheck)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })

        if (password.length < 5)
            return res
                .status(400)
                .json({ msg: "The password needs to be at least 5 characters long." })

        if (password !== passwordCheck)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." })


        const existingUser = await User.findOne({ email: email })

        if (existingUser)
            return res
                .status(400)
                .json({ msg: "An account with this email already exists." })

        if (!displayName) displayName = email
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            displayName,
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body

        if (!email || !password)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." })

        const user = await User.findOne({ email: email })
        if (!user)
            return res
                .status(400)
                .json({ msg: "No account with this email has been registered." });

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res
                .status(400)
                .json({ msg: "Invalid credentials" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

exports.delete = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.tokenIsValid = async (req, res) => {
    try {
        const token = req.header("x-auth-token")
        if (!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        console.log(verified);
        if (!verified) return res.json(false)

        const user = await User.findById(verified.id)
        if (!user) return res.json(false)

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.findById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        return res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

exports.googleLogin = async (req, res) => {
    console.log("POST googleLogin");
    const { tokenId } = req.body
    let clientRes = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID })
    const { email_verified, name, email } = await clientRes.payload

    if (email_verified) {
        const user = await User.findOne({ email })
        //login
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
            res.json({
                token,
                user: {
                    id: user.id,
                    displayName: user.displayName,
                    email: user.email
                }
            })
        }
        // register new user and login 
        else {
            // register
            let password = email + process.env.JWT_SECRET
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            const newUser = new User({
                email,
                password: passwordHash,
                displayName: name,
            });
            const savedUser = await newUser.save();
            const thisUser = await User.findOne({ email })

            // login
            const token = jwt.sign({ id: thisUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

            res.json({
                token,
                user: {
                    id: thisUser.id,
                    displayName: thisUser.displayName,
                    email: thisUser.email
                }
            })
        }
    }
}

exports.addAddress = async (req, res) => {
    try {
        let {
            recipientName,
            recipientSirName,
            phoneNumber,
            houseNumber,
            moo,
            road,
            subDistrict,
            district,
            province,
            postCode
        } = req.body


        if (!recipientName || !recipientSirName || !phoneNumber || !houseNumber || !district || !province || !postCode)
            return res
                .status(400)
                .json({ msg: "Not all importance fields have been entered." })

        const newAddress = new Address({
            recipientName,
            recipientSirName,
            phoneNumber,
            houseNumber,
            moo,
            road,
            subDistrict,
            district,
            province,
            postCode
        });
        const savedAddress = await newAddress.save();

        await User.findOneAndUpdate({ _id: req.user }, { addressId: savedAddress._id })
        const updatedUser = await User.findOne({ _id: req.user })
        res.json(updatedUser)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getAddress = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user })
        const address = await Address.findById(user.addressId)
        res.json(address)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({ ownerId: req.user, isActivate: true })
        res.json(shop)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

