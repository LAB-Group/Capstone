const db = require("../db")
const User = require("../models/user")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Events {

    static async listEvents() {
        /*
            list all events in the database
            from most recent to least recent
            each event will be displayed in a post
        */
        const results = await db.query(
            `
                SELECT e.id,
                       e.event_name AS "eventName",
                       e.event_date AS "eventDate",
                       e.event_type AS "eventType",
                       e.location AS "eventLocation",
                       e.event_game AS "eventGame",
                       e.details AS "eventDetails",
                       e.event_image_url AS "eventImageUrl",
                       u.id AS "creatorId",
                       u.username AS "creatorUsername",
                       e.created_at AS "eventCreatedAt",
                       e.updated_at AS "eventUpdatedAt",
                       COUNT(r.user_id) AS "numRegistered"
                FROM events AS e
                       LEFT JOIN users AS u ON u.id = e.user_id
                       LEFT JOIN registered_events as r ON r.event_id = e.id
                GROUP BY r.event_id, e.id, u.id
                ORDER BY e.created_at DESC
            `
        )
        return results.rows
    }

    static async fetchEventById(eventId) {
        // fetches an event by its id
        const results = await db.query(
            `
                SELECT e.id,
                       e.event_name AS "eventName",
                       e.event_date AS "eventDate",
                       e.event_type AS "eventType",
                       e.location AS "eventLocation",
                       e.event_game AS "eventGame",
                       e.details AS "eventDetails",
                       e.event_image_url AS "eventImageUrl",
                       u.id AS "creatorId",
                       u.username AS "creatorUsername",
                       u.email AS "creatorEmail",
                       e.created_at AS "eventCreatedAt",
                       e.updated_at AS "eventUpdatedAt",
                       COUNT(r.user_id) AS "numRegistered"
                FROM events AS e
                       LEFT JOIN users AS u ON u.id = e.user_id
                       LEFT JOIN registered_events as r ON r.event_id = e.id
                WHERE e.id = $1
                GROUP BY r.event_id, e.id, u.id
            `,
                [eventId]
        )

        const event = results.rows[0]

        if (!event) {
            throw new NotFoundError("Event not found.")
        }

        return event
    }

    static async createNewEvent({event, user}) {
        // ensures all required fields are present
        // NEED EVENT DATE
         const requiredFields = ["eventName", "eventDate", "eventType", "eventLocation", "eventGame", "eventDetails", "eventImageUrl"]
         requiredFields.forEach((field) => {
            if (!event.hasOwnProperty(field) || !event[field]) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
         })
         // insert event into database
         const results = await db.query(
            `
            INSERT INTO events (event_name, event_date, event_type, location, event_game, details, event_image_url, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, (SELECT id FROM users WHERE email = $8))
            RETURNING id,
                      event_name AS "eventName",
                      event_date AS "eventDate",
                      event_type AS "eventType",
                      location,
                      event_game AS "eventGame",
                      details,
                      event_image_url AS "eventImageUrl",
                      created_at AS "createdAt",
                      updated_at AS "updatedAt"
            `,
                [event.eventName, event.eventDate, event.eventType, event.eventLocation, event.eventGame, event.eventDetails, event.eventImageUrl, user.email]
         )
         return results.rows[0]
    }

    static async registerForEvent({registration, user, eventId}) {
        const existingRegisteredUser = await Events.fetchRegisteredForEventByUser({ user, eventId})
        if (existingRegisteredUser) {
            throw new BadRequestError(`Users aren't allowed to register more than once for an event.`)
        }

        const requiredFields = ["eventGame"]
         requiredFields.forEach((field) => {
            if (!registration.hasOwnProperty(field) || !registration[field]) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
         })

        const results = await db.query(
            `
                INSERT INTO registered_events (event_game, user_id, event_id)
                VALUES ($1, (SELECT id FROM users WHERE email = $2), $3)
                RETURNING id,
                          event_game AS "eventGame",
                          user_id AS "userId",
                          event_id AS "eventId";
            `,
            [registration.eventGame, user.email, eventId]
        )
        return results.rows[0]
    }

    static async withdrawUserFromEvent({user, eventId}) {
        const existingRegisteredUser = await Events.fetchRegisteredForEventByUser({ user, eventId})
        if (!existingRegisteredUser) {
            throw new BadRequestError(`Users aren't allowed to withdraw from an event they are not registered for.`)
        }
        const results = await db.query(
            `
                DELETE FROM registered_events
                WHERE user_id = (SELECT id FROM users WHERE username = $1) AND event_id = $2
            `,
            [user.username, eventId]
        )
        return `Withdrew user ${user.username} from event successfully!` 
    }

    static async fetchRegisteredForEventByUser({user, eventId}) {
        // fetches a specific user from a specific event if they/event exists
        const results = await db.query(
            `
                SELECT user_id, event_id, registered_at
                FROM registered_events
                WHERE user_id = (SELECT id FROM users WHERE username = $1) AND event_id = $2
            `,
            [user.username, eventId]
        )
        return results.rows[0]
    }

    static async fetchUsersEvents(userId) {
        const userExists = User.fetchUserById(userId)
        if(!userExists) {
            throw new NotFoundError("User does not exist.")
        }
        const results = await db.query(
            `
                SELECT r.user_id, 
                    r.registered_at,
                    e.id,
                    e.event_name AS "eventName",
                    e.event_date AS "eventDate",
                    e.event_type AS "eventType",
                    e.location AS "eventLocation",
                    e.event_game AS "eventGame",
                    e.details AS "eventDetails",
                    e.event_image_url AS "eventImageUrl",
                    e.created_at AS "eventCreatedAt",
                    e.updated_at AS "eventUpdatedAt"
                FROM registered_events AS r
                    LEFT JOIN events AS e ON e.id = r.event_id
                WHERE r.user_id = (SELECT id FROM users WHERE id = $1)
            `,
            [userId]
        )
        return results.rows
    }

    static async fetchUsersRegisteredForEvent(eventId) {
        const eventExists = fetchEventById(eventId)
        if(!eventExists) {
            throw new NotFoundError("Event does not exist.")
        }
        
        const numOfUsers = await db.query(
            `
                SELECT COUNT(user_id)
                FROM registered_events
                WHERE event_id = $1
            `,
            [eventId]
        )

        const results = await db.query(
            `
                SELECT user_id
                FROM registered_events
                WHERE event_id = $1
            `,
            [eventId]
        )
        
        return {
            numOfUsers: numOfUsers.rows[0],
            UsersRegistered: results.rows
        }
    }

    static async UserRegisteredForEvent({eventId, userId}) {
        const eventExists = fetchEventById(eventId)
        if(!eventExists) {
            throw new NotFoundError("Event does not exist.")
        }

        const userExists = User.fetchUserById(userId)
        if(!userExists) {
            throw new NotFoundError("User does not exist.")
        }

        const result = await db.query(
            `
                SELECT
                    id,
                    event_game,
                    user_id,
                    event_id
                FROM registered_events
                WHERE user_id = $1
                AND event_id = $2
            `,
                [userId, eventId]
        )
        if(result.rows.length === 0) {
            throw new NotFoundError("User not found registered for this event.")
        }

        const user = result.rows

        return user
    }

}

module.exports = Events