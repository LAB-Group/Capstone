const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class User {
  static makePublicUser(user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      imageUrl: user.image_url,
      gameList: user.game_list,
      createdAt: user.created_at
    }
  }

  static async login(credentials) {
    const requiredFields = ["email", "password"]
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`)
      }
    })

    const user = await User.fetchUserByEmail(credentials.email)
    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password)
      if (isValid) {
        return User.makePublicUser(user)
      }
    }

    throw new UnauthorizedError("Invalid username/password")
  }

  static async register(credentials) {
    const requiredFields = ["email", "password", "username", "firstName", "lastName", "imageUrl"]
    requiredFields.forEach((property) => {
      if (!credentials.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`)
      }
    })

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.")
    }

    const existingUser = await User.fetchUserByEmail(credentials.email)
    if (existingUser) {
      throw new BadRequestError(`A user already exists with email: ${credentials.email}`)
    }

    const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = credentials.email.toLowerCase()

    const userResult = await db.query(
      `INSERT INTO users (email, password, username, first_name, last_name, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, username, first_name, last_name, image_url, created_at;
      `,
      [normalizedEmail, hashedPassword, credentials.username, credentials.firstName, credentials.lastName, credentials.imageUrl]
    )
    const user = userResult.rows[0]
    return User.makePublicUser(user)
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided")
    }

    const query = `SELECT * FROM users WHERE email = $1`

    const result = await db.query(query, [email.toLowerCase()])

    const user = result.rows[0]

    return user
  }

  static async editUser({ userUpdate }) {
    const requiredFields = ["username", "firstName", "lastName", "imageUrl", "email", "gameList"]
    requiredFields.forEach((property) => {
      if (!userUpdate.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing ${property} in request body.`)
      }
    })

    const userResult = await db.query(
      `UPDATE users
       SET username = $1, first_name = $2, last_name = $3, image_url = $4, game_list = $6
       WHERE email = $5
       RETURNING username, first_name AS "firstName", last_name AS "lastName", image_url AS "imageUrl", email, game_list AS "gameList";
      `,
      [userUpdate.username, userUpdate.firstName, userUpdate.lastName, userUpdate.imageUrl, userUpdate.email, userUpdate.gameList]
    )
    const editedUser = userResult.rows[0]

    return editedUser
  }

}

module.exports = User