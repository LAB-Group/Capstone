const express = require("express")
const Posts = require("../models/posts")
const security = require("../middleware/security")
const router = express.Router()

router.post("/:eventId", async (req, res, next) => {
    try {
        // create a new post
        const { user } = res.locals
        const { eventId } = req.params
        const post = await Posts.createNewPost({user, post: req.body, eventId})
        return res.status(201).json({ post })
    } catch (err) {
        next(err)
    }
})

router.get("/:userId", async (req, res, next) => {
    try {
        // get all posts by user id
    } catch (err) {
        next(err)
    }
})

module.exports = router