const db = require("../db")
const Events = require("../models/events")
const { BadRequestError, NotFoundError } = require("../utils/errors")
const Posts = require("../models/posts")

class Replies {
    static async createReplyForPost({postId, user, reply}) {
        const requiredFields = ["replyContent"]
        requiredFields.forEach((field) => {
            if(!reply.hasOwnProperty(field) || !reply[field]) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        })

        //insert reply into database
        const results = await db.query(
            `
                INSERT INTO post_replies (reply, post_id, user_id)
                VALUES ($1, $2, (SELECT id FROM users WHERE email = $3))
                RETURNING 
                    id AS "replyId",
                    reply AS "replyContent",
                    user_id AS "creatorId",
                    post_id AS "postId",
                    created_at AS "createdAt"
            `,
                [reply.replyContent, postId, user.email]
        )

        return results.rows[0]
    }

    static async listRepliesByPostId(postId) {

        const results = await db.query(
            `
                SELECT 
                    r.id AS "replyId",
                    r.reply AS "replyContent",
                    u.id AS "creatorId",
                    u.username AS "creatorUsername",
                    u.image_url AS "creatorImageUrl",
                    p.id AS "postId",
                    r.created_at AS "replyCreatedAt"
                FROM post_replies AS r
                    LEFT JOIN users AS u ON u.id = r.user_id
                    LEFT JOIN posts AS p ON p.id = r.post_id
                WHERE p.id = $1
                ORDER BY r.created_at ASC
            `,
                [postId]
        )

        const replies = results.rows
        if (!replies) {
            throw new NotFoundError("No posts found.")
        }

        return replies
    }
}

module.exports = Replies