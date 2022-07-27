const axios = require("axios");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { TWITCH_CLIENT_ID, TWITCH_APP_ACCESS_TOKEN } = require("../config");

class Games {

static async getGameInfoById(gameId) {
    const requiredFields = ["gameId", "gameName", "gameImageUrl"]
        const results = await db.query(
      `
            SELECT  i.game_id AS "gameId", i.game_name AS "gameName" , i.game_image_url AS "gameImageUrl"
            FROM igdb_local as i
            WHERE i.game_id = $1
            `,
      [gameId]
    );
    return results.rows[0];
}

//   static getGameInfo(game) {
//     // const requiredFields = ["gameId", "gameName", "gameImageUrl"]
//     const results = db.query(
//       `
//             INSERT INTO igdb_local (game_id, game_name, game_image_url)
//             VALUES ($1, $2, $3)
//             RETURNING game_id AS "gameId",
//                       game_name AS "gameName",
//                       game_image_url AS "gameImageUrl",
//             `,
//       [
//         game.id,
//         game.name,
//         game["cover"].url
//       ]
//     );

//     return results.rows[0];
//   }
}

module.exports = Games;
