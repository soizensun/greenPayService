const bcrypt = require("bcryptjs");
const User = require('../models/User')
const jwt = require('jsonwebtoken')

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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
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