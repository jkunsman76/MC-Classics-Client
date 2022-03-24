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


    return (
        <section style={{ background: "#282c34", color: "#fff" }}>
            <Container className="projects">
                <Row style={{ textAlign: "center" }}>
                    <h1>Projects</h1>
                </Row>

                <Button style={{ marginLeft: "18px", marginBottom: "4px" }} variant="outline-success" size="sm"
                    onClick={() => {
                        history.push({ pathname: "/projects/new" })
                    }}
                >Add a New Project</Button>
                {
                    projects.map(project => {
                        return (
                            <Container key={`project--${project.id}`} className="project" >
                                <Row sm>
                                    <Badge style={{ margin: "2px" }} pill bg="secondary"><h5>{project.title}</h5></Badge>
                                </Row>
                                <Row sm>
                                    <Row xs>Owner: {project.gear_head?.user?.first_name} {project.gear_head?.user?.last_name}</Row>
                                    <Row xs>Year: {project.year}</Row>
                                    <Row xs>Make: {project.make}</Row>
                                    <Row xs>Model: {project.model}</Row>
                                </Row>
                                <Row sm>
                                    <Col xs><Image style={{ marginTop: "4px", marginBottom: "8px" }} src={"http://localhost:8000" + project.image} fluid /></Col>
                                    <Col xs>{project.details}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant="outline-secondary" color="#fff" size="md" onClick={() => history.push(`/projects/${project.id}`)}>view</Button>
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
