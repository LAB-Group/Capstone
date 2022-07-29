const axios = require("axios");
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Games {

  static async addGamesToLocalDB(localDBForm) {
        const results = await db.query(
          `
           INSERT INTO igdb_local (game_id, game_name, game_image_url)
           VALUES ($1, $2, $3)
           ON CONFLICT (game_id)
           DO NOTHING
           RETURNING game_id AS "gameId",
                     game_name AS "gameName",
                     game_image_url AS "gameImageUrl"
           `,
            [localDBForm.gameId, localDBForm.gameName, localDBForm.gameImageUrl]
        );
}

static async getGameInfoById(gameId) {
        const results = await db.query(
      `
            SELECT  i.game_id AS "gameId", i.game_name AS "gameName" , i.game_image_url AS "gameImageUrl"
            FROM igdb_local as i
            WHERE i.game_id = $1
            `,
      [gameId.gameId]
    );
    return results.rows[0];
}
}

module.exports = Games;
