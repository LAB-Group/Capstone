const axios = require("axios")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { TWITCH_CLIENT_ID, TWITCH_APP_ACCESS_TOKEN } = require("../config")
const igdb = require('igdb-api-node').default;

class Games {
  
    static async searchGame() {
        // console.log("MODEL",searchInput)

        // return searchInput            
    }


}

module.exports = Games