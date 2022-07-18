const db = require("../db")
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
                       e.event_type AS "eventType",
                       e.location AS "eventLocation",
                       e.event_game AS "eventGame",
                       e.details AS "eventDetails",
                       e.event_image_url AS "eventImageUrl",
                       u.id AS "creatorId",
                       e.created_at AS "eventCreatedAt",
                       e.updated_at AS "eventUpdatedAt"
                FROM events AS e
                       LEFT JOIN users AS u ON u.id = e.user_id
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
                       e.event_type AS "eventType",
                       e.location AS "eventLocation",
                       e.event_game AS "eventGame",
                       e.details AS "eventDetails",
                       e.event_image_url AS "eventImageUrl",
                       u.id AS "creatorId",
                       e.created_at AS "eventCreatedAt",
                       e.updated_at AS "eventUpdatedAt"
                FROM events AS e
                       LEFT JOIN users AS u ON u.id = e.user_id
                WHERE e.id = $1
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
         const requiredFields = ["eventName", "eventType", "eventLocation", "eventGame", "eventDetails", "eventImageUrl"]
         requiredFields.forEach((field) => {
            if (!event.hasOwnProperty(field) || !event[field]) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
         })

         // insert event into database
         const results = await db.query(
            `
            INSERT INTO events (event_name, event_type, location, event_game, details, event_image_url, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, (SELECT id FROM users WHERE email = $7))
            RETURNING id,
                      event_name AS "eventName",
                      event_type AS "eventType",
                      location,
                      event_game AS "eventGame",
                      details,
                      event_image_url AS "eventImageUrl",
                      created_at AS "createdAt",
                      updated_at AS "updatedAt"
            `,
                [event.eventName, event.eventType, event.eventLocation, event.eventGame, event.eventDetails, event.eventImageUrl, user.email]
         )

         return results.rows[0]
    }



}

module.exports = Events