export const getComments = () => {
    return fetch("http://localhost:8000/comments", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleComment = (id) => {
    return  fetch(`http://localhost:8000/comments/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
    .then(res => res.json())
}

export const getUsersComments  = () => {
    return fetch(`http://localhost:8000/comments/userscomments`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(res => res.json())
}

export const createComment = (comment) => {
    return fetch("http://localhost:8000/comments", {        
        method: "POST",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
})      
}

export const updateComment = (comment) => {
    return fetch(`http://localhost:8000/comments/${comment.id}`, {        
        method: "PUT",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
})       
}

export const deleteComment = (comment_id) => {
    return fetch(`http://localhost:8000/comments/${comment_id}`, {        
        method: "Delete",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
})    
}
