import axios from "axios"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "gameon_token"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    async request({ endpoint, method = `GET`, data={}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }

        if(this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios ({ url, method, data, headers })
            return {data: res.data, error:null}
        } catch(error) {
            console.error({errorResponse: error.response})
            const message = error?.response?.data?.error?.message
            return { data: null,error: message || String(error)}
        }
    }

    async loginUser(credentials) {
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials})
    }

    async logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }
    
    async signupUser(credentials) {
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials})
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/me`, method: `GET` })
    }

    async editUserProfile(editedUser) {
        return await this.request({ endpoint: `auth/profile`, method: `PUT`, data: editedUser })
    }

    async createEvent(event) {
        return await this.request({ endpoint: `events`, method: `POST`, data: event })
    }

    async fetchEvents() {
        return await this.request({ endpoint: `events`, method: `GET` })
    }

    async registerForEvent(registration) {
        return await this.request({ endpoint: `events/${registration.eventId}`, method: `POST`, data: registration })
    }

    async searchGame(searchInput) {
        return await this.request({ endpoint: `games`, method: `POST`, data: searchInput })
    }

    async getGameDetails(gameId) {
        return await this.request({ endpoint: `games/id`, method: `POST`, data: gameId })
    }

    async addGamesToLocalDB(localDBForm) {
        return await this.request({ endpoint: `games/db`, method: `POST`, data: localDBForm })
    }

    async getGameInfoById(gameId) {
        return await this.request({ endpoint: `games/db`, method: `GET`, data: gameId })
    }

    async createNewPost(post) {
        return await this.request({ endpoint: `events/${post.eventId}/posts`, method: `POST`, data: post })
    }

    async listAllPostsByEventId(eventId) {
        return await this.request({ endpoint: `events/${eventId}/posts`, method: `GET`})
    }

    async listAllPostsByUserId(userId) {
        return await this.request({ endpoint: `posts/user/${userId}`, method: `GET`})
    }

    async createPostReply(reply) {
        return await this.request({ endpoint: `events/${reply.eventId}/posts/${reply.postId}/post_replies`, method: `POST`, data: reply })
    }

    async listAllRepliesByEventId(eventId, postId) {
        return await this.request({ endpoint: `events/${eventId}/posts/${postId}/post_replies`, method: `GET`})
    }

    async fetchUsersEvents(userId) {
        return await this.request({ endpoint: `events/user/${userId}`, method: `GET` })
    }
}

export default new ApiClient("http://localhost:3001")