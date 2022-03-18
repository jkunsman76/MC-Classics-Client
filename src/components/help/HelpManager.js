export const getAllHelpRequests = () => {
    return fetch("http://localhost:8000/help", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}
export const getSingleHelpRequest = (id) => {
    return  fetch(`http://localhost:8000/help/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
    .then(res => res.json())
}

export const createHelpRequest = (help) => {
    return fetch("http://localhost:8000/help", {        
        method: "POST",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(help)
})      
}


export const updateHelpRequest = (help) => {
    return fetch(`http://localhost:8000/help/${help.id}`, {        
        method: "PUT",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(help)
})       
}

export const deleteHelpRequest = (help_id) => {
    return fetch(`http://localhost:8000/help/${help_id}`, {        
        method: "Delete",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
})   .then(getAllHelpRequests)    
}