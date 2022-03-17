import React, { useRef, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Breadcrumb, Button, Card, Form, FormGroup } from 'react-bootstrap'
import { createProject } from "./ProjectsManager"


//! need to store photos in state and then use the state as the value to the image key so i can upload multiple images, 
//!  i also need to look at the imagefield in server. i used pillow, i really dont know to much about this process...
//! need to figure out why its forcing me to apply gear_head info, back end should do that.


const initialState = {
    title: "",
    make: "",
    model: "",
    year: "",
    details: "",
    image: "",
    gear_head: ""
};

export const ProjectsForm = () => {
    const history = useHistory()
    const [user_id] = useState(JSON.parse(localStorage.getItem("token")))
    const [newProject, setNewProject] = useState(initialState)
    // const [uploadedPhotos, setUploadedPhotos] = useState([])

    useEffect(() => {}, [newProject])

    // const photoHandler = (e)=> {
    //     const { id, value } = e.target;
    //     setUploadedPhotos({ ...uploadedPhotos, [id]: value })
    // }

    const inputHandler = (e) => {
        const { id, value } = e.target;
        setNewProject({ ...newProject, [id]: value })
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const { title, make, model, year, details, image } = newProject

        const newProjectObj = {
            title,
            make,
            model,
            year,
            details,
            image,
            gear_head: 1

        }
        createProject(newProjectObj).then(() => history.push("/projects"))
    };

    const Range = (startYear) => {
        let currentYear = new Date().getFullYear(), years = [];
        startYear = 1900;
        while (startYear <= (currentYear - 25)) {
            years.push(startYear++);
        }
        return years;
    }

    return (
        <>
            <Container>
                <Form>
                    <FormGroup >
                        <Form.Label>Title</Form.Label>
                        <Form.Control id="title" type="text" defaultValue={newProject.title} onChange={inputHandler} required placeholder="Ramblin Rambler Rebuild" />
                        <Form.Text className="text-muted">
                            This will be the "name" of your project, be creative!
                        </Form.Text>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Make</Form.Label>
                        <Form.Control id="make" type="text" defaultValue={newProject.make} onChange={inputHandler} required placeholder="Make" />
                        <Form.Text className="text-muted">
                            Who built this beauty?
                        </Form.Text>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Model</Form.Label>
                        <Form.Control id="model" type="text" defaultValue={newProject.model} onChange={inputHandler} required placeholder="Model " />
                        <Form.Text className="text-muted">
                            Just the model ya'll. Details come later.
                        </Form.Text>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Year</Form.Label>
                        <Form.Control as="select" id="year" defaultValue={newProject.year} onChange={inputHandler} >
                            <option key="year--0" value="">Select Year</option>
                            {Range().map((year, I) => (
                                <option key={I} value={year}>
                                    {year}
                                </option>))}
                        </Form.Control>
                        <Form.Text className="text-muted">
                            When! When! When!
                        </Form.Text>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Details</Form.Label>
                        <Form.Control id="details" type="text" defaultValue={newProject.details} onChange={inputHandler} required placeholder="Share it all.." />
                        <Form.Text className="text-muted">
                            Now you can talk about that super rare trim package.
                        </Form.Text>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Image</Form.Label>
                        <Form.Control id="image" type="file" multiple defaultValue={newProject.image} onChange={inputHandler} placeholder="Upload your photos here" />
                        <Form.Text className="text-muted">
                            Time to share all the rad stuff your doing or planning on doing at least. Please no nudity, lets keep it classy here.
                        </Form.Text>
                    </FormGroup>
                    <Button variant="success" onClick={handleOnSubmit}>Create Project</Button>
                </Form>
            </Container>
        </>
    )
}
