import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getProjects, deleteProject } from "./ProjectsManager"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Badge, Button, Card, Form, FormGroup, Image } from 'react-bootstrap'

export const ProjectsList = () => {
    const [projects, setProjects] = useState([])
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("currentUser"))
   
    useEffect(() => {
        getProjects().then(data => setProjects(data))
    }, [])
    console.log(projects)
    console.log(currentUser)

    const projectFilter = (array) => {const filteredProjects = array.filter(project => project.gear_head?.id === currentUser)
        return filteredProjects
     }

console.log(projectFilter(projects))
    return (
        <section style={{ background: "#282c34", color: "#fff" }}>
            <Container className="projects">
                <Row style={{ textAlign: "center" }}>
                    <h1>Projects</h1>
                </Row>

                <Button style={{margin:"4px"}} variant="success" size="sm"
                    onClick={() => {
                        history.push({ pathname: "/projects/new" })
                    }}
                >Add a New Project</Button>
                {
                    projectFilter(projects).map(project => {
                        return (
                            <Container key={`project--${project.id}`} className="project" >
                                <Row sm>
                                    <Badge style={{margin:"2px"}} pill bg="secondary">{project.title}</Badge>
                                </Row>
                                <Row sm>
                                    <Row xs>Year: {project.year}</Row>
                                    <Row xs>Make: {project.make}</Row>
                                    <Row xs>Model: {project.model}</Row>
                                </Row>
                                <Row sm>
                                    <Col xs><Image style={{marginTop:"2px", marginBottom:"4px"}} src={"http://localhost:8000" + project.image} fluid /></Col>
                                    <Col xs>{project.details}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant="outline-warning" size="md" onClick={() => history.push(`/projects/${project.id}/update`)}>Edit</Button>
                                    </Col>
                                    <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button style={{margin:"4px"}} variant="outline-danger" size="md" onClick={() => deleteProject(project.id).then(getProjects)}>Delete</Button>
                                    </Col>
                                </Row>
                            </Container>
                        )
                    })
                }
            </Container>
        </section>
    )
}
