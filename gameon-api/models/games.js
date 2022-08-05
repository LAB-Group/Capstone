const axios = require("axios");
const db = require("../db")
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../utils/errors");

class Games {

  static async addGamesToLocalDB(localDBForm) {

        const results = await db.query(
          `
           INSERT INTO igdb_local (game_id, game_name, game_summary, game_image_url)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (game_id)
           DO NOTHING
           RETURNING game_id AS "gameId",
                     game_name AS "gameName",
                     game_summary AS "gameSummary",
                     game_image_url AS "gameImageUrl"
           `,
            [localDBForm.gameId, localDBForm.gameName, localDBForm.gameSummary, localDBForm.gameImageUrl]
        );
  }

  static async getGameInfoById(gameId) {
    // const gameIdExists = fetchGameById(gameId)
    const results = await db.query(
      `
        SELECT  i.game_id AS "gameId", i.game_name AS "gameName", i.game_summary AS "gameSummary", i.game_image_url AS "gameImageUrl"
        FROM igdb_local as i
        WHERE i.game_id = $1
      `,
        [gameId]
      );

    if(!results.rows[0]) {
      throw new NotFoundError("Game not found for this ID.")
    }
      
    return results.rows[0];
  }
}

module.exports = Games;
