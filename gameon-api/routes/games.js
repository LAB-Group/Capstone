const express = require("express")
const router = express.Router()
const axios = require("axios")
const { TWITCH_CLIENT_ID, TWITCH_APP_ACCESS_TOKEN } = require("../config");
const Games = require("../models/games");

router.post("/", async (req, res, next) => {
    const searched = req.body
    await axios({
        url: "https://api.igdb.com/v4/games",
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Client-ID': `${TWITCH_CLIENT_ID}`,
            'Authorization': `Bearer ${TWITCH_APP_ACCESS_TOKEN}`,
        },
        data: `search "${searched.searched}"; fields id, name, summary, cover.url; limit 500;`,
    })
        .then((response) => {
            const games = response.data
            res.status(200).json({ games })
        })
        .catch((err) => {
            console.error(err);
        })
})

router.post("/id", async (req, res, next) => {
    const gameId = req.body

    axios({
        url: "https://api.igdb.com/v4/games",
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Client-ID': `${TWITCH_CLIENT_ID}`,
            'Authorization': `Bearer ${TWITCH_APP_ACCESS_TOKEN}`,
        },
        //data: `fields id, name, cover.url; where id = ${gameId.gameId};`,
        data: `fields id, name, cover.url; where id = (${gameId.gameId});`,
    })
        .then((response) => {
            const game = response.data
            //const gameInfo = Games.getGameInfo(response.data)
            res.status(200).json({ game })
        })
        .catch((err) => {
            console.error("Error: ", err);
        });
        
        
})

router.get("/db/:gameId", async (req, res, next) => {
    try {
        const { gameId } = req.params
        // const game = req.body
        const game = await Games.getGameInfoById(gameId)
        res.status(200).json(game)
    } catch(err) {
        next(err)
    }
})

router.post("/db", async (req, res, next) => {
    try {
        const localDBForm = req.body
        const games = await Games.addGamesToLocalDB(localDBForm)
        res.status(201).json(games)
    } catch(err) {
        next(err)
    }
})


module.exports = router