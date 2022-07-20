const app = require("./app")
const { PORT } = require("./config")
var cors_anywhere = require("cors-anywhere")

const proxyPort = 4001

// installed npm install --save cors-anywhere, also installed apicalypse but never used it, might be an issue?
cors_anywhere = require('cors-anywhere')
cors_anywhere.createServer({
    originWhiteList: [],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(proxyPort, function() {
    console.log(`🚀 Running CORS Anywhere on localhost:${proxyPort}`)
})

app.listen(PORT, () => {
    console.log(`🐱‍👤Server running http://localhost:${PORT}`)
})
