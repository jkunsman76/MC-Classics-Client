import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getSingleProject } from "./ProjectsManager"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Badge, Button, Card, Form, FormGroup, Image } from 'react-bootstrap'

export const ProjectView = () => {
    const [project, setProject] = useState([])
    const history = useHistory()
    const { currentProject } = useParams()
    const currentUser = parseInt(localStorage.getItem("currentUser"))

    useEffect(() => {
        getSingleProject(currentProject).then(data => setProject(data))
    }, [])
    console.log(currentProject)
    // console.log(currentUser)

    return (
        <section style={{ background: "#282c34", color: "#fff" }}>
            <Container className="projects">
                <Row style={{ textAlign: "center" }}>
                    <h1>Project</h1>
                </Row>
                <Container key={`project--${project.id}`} className="project" >
                    <Row sm>
                        <Badge style={{ margin: "2px" }} pill bg="secondary"><h5>{project.title}</h5></Badge>
                    </Row>
                    <Row sm>
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
                            <Button variant="outline-warning" size="md">Comment</Button>
                        </Col>
                        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button style={{ margin: "4px" }} variant="outline-danger" size="md">Delete Comment</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </section>
    )
}
