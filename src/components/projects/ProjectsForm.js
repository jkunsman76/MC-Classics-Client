import React, { useRef, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Breadcrumb, Button, Card, Form, FormGroup } from 'react-bootstrap'
import { createProject } from "./ProjectsManager"

//TODO Need to add functionality for uploading multiple images to a project. 

const initialState = {
    title: "",
    make: "",
    model: "",
    year: "",
    details: "",
    image: ""
};

export const ProjectsForm = () => {
    const history = useHistory()
    const [newProject, setNewProject] = useState(initialState)
    const [uploadedPhotos, setUploadedPhotos] = useState({})

    useEffect(() => { }, [newProject])

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
            image: uploadedPhotos
        }
        createProject(newProjectObj).then(() => history.push("/projects"))
    };

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            let base64Image = { ...uploadedPhotos }
            base64Image = base64ImageString
            setUploadedPhotos(base64Image)
            // Update a component state variable to the value of base64ImageString
        });
    }

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
            <section style={{ background: "#282c34", color: "#fff" }}>
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
                            <Form.Control id="image" type="file" multiple defaultValue={newProject.image} onChange={createImageString} placeholder="Upload your photos here" />
                            <Form.Text className="text-muted">
                                Cool photo goes here!
                            </Form.Text>
                        </FormGroup>
                        <Button variant="outline-success" onClick={handleOnSubmit}>Create Project</Button>
                    </Form>
                </Container>
            </section>
        </>
    )
}
