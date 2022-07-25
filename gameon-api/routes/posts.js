const express = require("express")
const Posts = require("../models/posts")
const security = require("../middleware/security")
const router = express.Router()

router.post("/:eventId", async (req, res, next) => {
    try {
        // create a new event
        const { user } = res.locals
        console.log("user (routes): ", user)
        const { eventId } = req.params
        console.log("req.body: ", req.body)
        const post = await Posts.createNewPost({user, post: req.body, eventId})
        return res.status(201).json({ post })
    } catch (err) {
        next(err)
    }
})

router.get("/:eventId", async (req, res, next) => {
    try {
        // get all posts for this event
        
    } catch (err) {

    }
})

module.exports = router