export const getProjects = () => {
    return fetch("http://localhost:8000/projects", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}
export const getSingleProject = (id) => {
    return  fetch(`http://localhost:8000/projects/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
    .then(res => res.json())
}
export const getUsersProjects  = () => {
    return fetch(`http://localhost:8000/projects/usersprojects`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(res => res.json())
}

export const createProject = (project) => {
    return fetch("http://localhost:8000/projects", {        
        method: "POST",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(project)
})      
}


export const updateProject = (project) => {
    return fetch(`http://localhost:8000/projects/${project.id}`, {        
        method: "PUT",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(project)
})       
}

export const deleteProject = (project_id) => {
    return fetch(`http://localhost:8000/projects/${project_id}`, {        
        method: "Delete",
        headers:{
        "Authorization": `Token ${localStorage.getItem("mc_token")}`,
        "Content-Type": "application/json"
    },
})   .then(getProjects)    
}