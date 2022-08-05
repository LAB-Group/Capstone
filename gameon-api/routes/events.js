const express = require("express")
const Events = require("../models/events")
const Posts = require("../models/posts")
const Replies = require("../models/replies")
const security = require("../middleware/security")
const router = express.Router()

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // create a new event
        const { user } = res.locals
        const event = await Events.createNewEvent({user, event: req.body})
        return res.status(201).json({ event })
    } catch (err) {
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        // list all events
        const events = await Events.listEvents()
        return res.status(200).json({ events })
    } catch (err) {
        next(err)
    }
})

router.get("/:eventId", async (req, res, next) => {
    try {
        // fetch a specific event by Id
        const { eventId } = req.params
        const event = await Events.fetchEventById(eventId)
        return res.status(200).json({ event })
    } catch (err) {
        next(err)
    }
})

router.post("/:eventId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // register to a specific event
        const { eventId } = req.params
        const { user } = res.locals
        const registeredUser = await Events.registerForEvent({registration: req.body, user, eventId})
        return res.status(201).json({ registeredUser })
    } catch (err) {
        next(err)
    }
})

router.get("/:eventId/users", async (req, res, next) => {
    try {
        const { eventId } = req.params
        const userData = await Events.fetchUsersRegisteredForEvent(eventId)
        return res.status(200).json( userData )
    } catch (err) {
        next(err)
    }
})

router.get("/user/:userId", async (req, res, next) => {
    try {
        const { userId } = req.params
        const eventData = await Events.fetchUsersEvents(userId)
        return res.status(200).json( eventData )
    } catch (err) {
        next(err)
    }
})

router.delete("/:eventId/withdraw", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { eventId } = req.params
        const { user } = res.locals
        const withdrawedUser = await Events.withdrawUserFromEvent({ user, eventId})
        return res.status(202).json({ withdrawedUser })
    } catch (err) {
        next(err)
    }
})

router.post("/:eventId/posts", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // create a new post for an event
        const { user } = res.locals
        const { eventId } = req.params
        const post = await Posts.createNewPost({user, post: req.body, eventId})
        return res.status(201).json({ post })
    } catch (err) {
        next(err)
    }
})

router.get("/:eventId/posts", async (req, res, next) => {
    try {
        // list all posts associated with an event
        const { eventId } = req.params
        const posts = await Posts.listAllPostsByEventId(eventId)
        return res.status(200).json({ posts })
    } catch (err) {
        next(err)
    }
})

router.get("/:eventId/posts/:postId", async (req, res, next) => {
    try {
        // list a specified post for an event
        const eventId = req.params.eventId
        const postId = req.params.postId
        
        const post = await Posts.listSpecificPostByEventId({eventId, postId})
        return res.status(200).json({ post })
    } catch (err) {
        next(err)
    }
})

router.post("/:eventId/posts/:postId/post_replies", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // create a reply to a post on an event
        const eventId = req.params.eventId
        const postId = req.params.postId
        
        const { user } = res.locals
        const reply = await Replies.createReplyForPost({eventId, postId, user, reply: req.body})
        return res.status(201).json({ reply })
    } catch (err) {
        next(err)
    }
})

router.get("/:eventId/posts/:postId/post_replies", async (req, res, next) => {
    try {
        // get all replies for a specified post
        const postId = req.params.postId

        const replies = await Replies.listRepliesByPostId(postId)
        return res.status(200).json({ replies })
    } catch (err) {
        next(err)
    }
})

router.get("/:eventId/user/:userId", async (req, res, next) => {
    try {
        // get information if a specific user is registered for an event
        const eventId = req.params.eventId
        const userId = req.params.userId

        const isRegistered = await Events.UserRegisteredForEvent({userId, eventId})
        return res.status(200).json({isRegistered})
    } catch (err) {
        next(err)
    }
})

module.exports = router