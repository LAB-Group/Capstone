const express = require("express")
const Posts = require("../models/posts")
const security = require("../middleware/security")
const router = express.Router()

router.get("/user/:userId", async (req, res, next) => {
    try {
        // list all posts associated with a user
        const { userId } = req.params
        const posts = await Posts.listAllPostsByUserId(userId)
        return res.status(200).json({ posts })
    } catch (err) {
        next(err)
    }
})

module.exports = router