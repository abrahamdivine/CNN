const User = require("../models/user.js");

const express = require("express");

const bcrypt = require("bcryptjs");

const router = express.Router();

const jwt = require ("jsonwebtoken");

router.post("/signup", async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });

});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
}
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
}
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});
module.exports = router;