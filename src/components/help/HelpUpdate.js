import React, { useRef, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Breadcrumb, Button, Card, Form, FormGroup } from 'react-bootstrap'
import { updateHelpRequest,getSingleHelpRequest } from "./HelpManager"
import { getUsersProjects} from "../projects/ProjectsManager"


const initialState = {
   author: "", content: "", project: ""
};

export const HelpUpdate = () => {
    const history = useHistory()
    const requestId = useParams()
    const [newRequest, setNewRequest] = useState(initialState)
    const currentUser = parseInt(localStorage.getItem("currentUser"))
    const [projects, setProjects] = useState([])
    
    useEffect(() => { getUsersProjects().then(data => setProjects(data)) }, [])
    useEffect(() => {
        getSingleHelpRequest(parseInt(requestId.currentRequest))
            .then((data) => { setNewRequest(data) })
    }, [])


console.log(parseInt(requestId.currentRequest))
    const inputHandler = (e) => {
        const { id, value } = e.target;
        setNewRequest({ ...newRequest, [id]: value })
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const { author, content, project } = newRequest

        const newRequestObj = {
            id:requestId.currentRequest,
            author: currentUser,
            content,
            project,
        }

        updateHelpRequest(newRequestObj).then(() => history.push("/help"))
    };

    return (
        <>
            <section style={{ background: "#282c34", color: "#fff" }}>
                <Container>
                    <Form>
                        <FormGroup >
                            <Form.Label>Project</Form.Label>
                            <Form.Control as="select" id="project" defaultValue={parseInt(newRequest.project?.id)} onChange={inputHandler} >
                                <option key="project--0" value="">Select Project</option>
                                {projects.map((project, I) => (
                                    <option key={I} value={parseInt(project.id)}>
                                        {project.title}
                                    </option>))}
                            </Form.Control>
                            <Form.Text className="text-muted">
                                This is the "Type" of event: Show and Shine, Swap Meet, WorkShop
                            </Form.Text>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Description</Form.Label>
                            <Form.Control id="content" as="textarea" style={{height:"150px"}} defaultValue={newRequest.content} onChange={inputHandler} required placeholder="The event takes places at the fairgrounds bring your cooler and parts!" />
                            <Form.Text className="text-muted">
                                Explain what you need help with, and include some type of contact information
                            </Form.Text>
                        </FormGroup>
                        <Button variant="success" onClick={handleOnSubmit}>Update</Button>
                    </Form>
                </Container>
            </section>
        </>
    )
}
