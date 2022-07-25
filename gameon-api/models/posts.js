const db = require("../db")
const Events = require("../models/events")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Posts {
    static async createNewPost({post, user, eventId}) {
        const requiredFields = ["postTitle", "postContent"]
        requiredFields.forEach((field) => {
            if (!post.hasOwnProperty(field) || !post[field]) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        })
        console.log("user: ", user)
        const eventExists = await Events.fetchEventById(eventId)
        if(!eventExists) {
            throw new NotFoundError("Event not found")
        }

        //insert post into database
        const results = await db.query(
            `
            INSERT INTO posts (title, content, event_id, user_id)
            VALUES ($1, $2, $3, (SELECT id FROM users WHERE email = $4))
            RETURNING id,
                      title,
                      content,
                      user_id AS "creatorId",
                      event_id AS "eventId",
                      created_at AS "createdAt"
            `,
                [post.postTitle, post.postContent, eventId, user.email]
        )

        return results.rows[0]
    }

    static async listPostByEventId(eventId) {

        const results = await db.query(
            `
                SELECT p.id AS "postId",
                       p.title AS "postTitle",
                       p.content "postContent",
                       p.created_at AS "postCreatedAt",
                       u.id AS "creatorId",
                       e.id AS "eventId"
                FROM posts AS p
                       LEFT JOIN users AS u ON u.id = p.user_id,
                       LEFT JOIN events AS e ON e.id = p.event_id
                WHERE e.id = $1
            `,
                [eventId]
        )

        const posts = results.rows
        if (!posts) {
            throw new NotFoundError("No posts found.")
        }

        return posts
    }
}

module.exports = Posts