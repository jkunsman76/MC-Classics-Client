import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getProjects, deleteProject } from "./ProjectsManager"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Breadcrumb, Button, Card, Form, FormGroup } from 'react-bootstrap'

export const ProjectsList=() => {
    const [projects, setProjects] = useState([])
    const history = useHistory()
    const getAllProjects = () => {
        getProjects().then(data => setProjects(data))
    }
    useEffect(() => {
        getAllProjects()
    }, [])

    return (
        <Container className="projects">
            <Button variant="success" size="sm"
                onClick={() => {
                    history.push({ pathname: "/projects/new" })
                }}
            >Add a New Project</Button>
            {
                projects.map(project => {
                    return <Container key={`project--${project.id}`} className="project">
                        <div className="project__title">{project.title}</div>
                        <div className="project__make">{project.make}</div>
                        <div className="project__model">{project.model}</div>
                        <div className="project__year">{project.year}</div>
                        <div className="project__date">{project.start_date}</div>
                        <div className="project__image">{project.image}</div>
                        <div className="project__details">{project.details}</div>
                        <Button variant="warning" size="sm" onClick={() => history.push(`/projects/${project.id}/update`)}>Edit</Button>
                        <div>
                        <Button variant="danger" size="sm" onClick={() => deleteProject(project.id).then(getAllProjects)}>Delete</Button>
                        </div>
                    </Container>
                })
            }
        </Container>
    )
}
