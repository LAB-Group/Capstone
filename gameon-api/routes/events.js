const express = require("express")
const Events = require("../models/events")
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

module.exports = router