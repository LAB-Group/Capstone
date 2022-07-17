import * as React from "react"


export default function ProfilePage(){
    return(
        <div className="profile-page">
            <div className="profile-info">
                <img src="" alt="" />
                <input type="text" className="name"/>
                <input type="text" className="preferred"/>
                <input type="text" className="location"/>
                <input type="text" className="games-played"/>
                <button className="edit-button">Edit Profile</button>
            </div>
            <div className="events-info">
                <img src="" alt="" />
                <input type="text" className="name"/>
                <input type="text" className="preferred"/>
                <input type="text" className="location"/>
                <input type="text" className="games-played"/>
                <button className="edit-button">Edit Profile</button>
            </div>
            <div className="profile-info">
                <img src="" alt="" />
                <input type="text" className="name"/>
                <input type="text" className="preferred"/>
                <input type="text" className="location"/>
                <input type="text" className="games-played"/>
                <button className="edit-button">Edit Profile</button>
            </div>

        </div>
    )
}