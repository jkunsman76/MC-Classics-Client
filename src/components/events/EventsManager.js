export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}
export const getSingleEvent = (id) => {
    return  fetch(`http://localhost:8000/events/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
    .then(res => res.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {        
        method: "POST",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
})      
}


export const updateEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {        
        method: "PUT",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
})       
}

export const deleteEvent = (event_id) => {
    return fetch(`http://localhost:8000/events/${event_id}`, {        
        method: "Delete",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
})   .then(getEvents)    
}