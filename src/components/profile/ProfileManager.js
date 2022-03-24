export const getAllProfiles = () => {
    return fetch("http://localhost:8000/profiles", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

export const getCurrentProfile = () => {
    return fetch(`http://localhost:8000/profiles/currentuser`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(res => res.json())
}

export const updateProfile = (profile) => {
    return fetch(`http://localhost:8000/profiles/${profile.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
}

export const deleteProfile = (profile_id) => {
    return fetch(`http://localhost:8000/profiles/${profile_id}`, {
        method: "Delete",
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`,
            "Content-Type": "application/json"
        },
    })
}
