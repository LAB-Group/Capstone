const express = require("express")
const router = express.Router()
const axios = require("axios")
const { TWITCH_CLIENT_ID, TWITCH_APP_ACCESS_TOKEN } = require("../config");
const Games = require("../models/games");

router.post("/", async (req, res, next) => {
    const searched = req.body
    console.log("searched: ", searched.searched)
    // console.log("SEARCH MODEL", Games.searchGame())
    await axios({
        url: "https://api.igdb.com/v4/games",
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Client-ID': `${TWITCH_CLIENT_ID}`,
            'Authorization': `Bearer ${TWITCH_APP_ACCESS_TOKEN}`,
        },
        data: `search "${searched.searched}"; fields id, name, cover.url; limit 500;`,
    })
        .then((response) => {
            // console.log("RES>DATA",response.data);
            const games = response.data
            res.status(200).json({ games })
        })
        .catch((err) => {
            console.error(err);
        });
    // try{

    //     const games = await Games.searchGame(req.body)
    //     console.log("ROUTE",games)
    //     res.status(200).json({ games })
    // } catch(err) {
    //     next(err)
    // }
});

router.get("/:gameId", async (req, res, next) => {
    const gameId = req.params
    console.log("gameId: ", gameId)
    axios({
        url: "https://api.igdb.com/v4/games",
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Client-ID': `${TWITCH_CLIENT_ID}`,
            'Authorization': `Bearer ${TWITCH_APP_ACCESS_TOKEN}`,
        },
        data: `fields id, name, cover.url; where id = ${gameId.gameId};`,
    })
        .then((response) => {
            const games = response.data
            res.status(200).json({ games })
            console.log("games: ", games)
        })
        .catch((err) => {
            console.error("Error: ", err);
        });
})

module.exports = router