import * as React from "react"
import { useState, useEffect } from "react"
import apiClient from "../../contexts/auth"

export default function Search() {
    return (
        <div>
            <h1>Game Search Bar</h1>
            <SearchBar />
        </div>
    )
}

function SearchBar() {
    return (
        <div>
            <input
                type="text"
                placeholder="search for a game!"
            />
        </div>
    )
}