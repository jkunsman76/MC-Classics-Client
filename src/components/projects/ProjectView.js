import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getSingleProject } from "./ProjectsManager"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Badge, Button, Card, Form, Stack, FormGroup, Image } from 'react-bootstrap'
import { getComments, createComment, deleteComment } from '../comments/CommentsManager'

const initialState = {
    content: "", author: "", project: ""
};
export const ProjectView = () => {
    const [project, setProject] = useState([])
    const history = useHistory()
    const { currentProject } = useParams()
    const currentUser = parseInt(localStorage.getItem("currentUser"))
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState(initialState)

    const getAll = () => {
        getSingleProject(currentProject).then(data => setProject(data))
        getComments().then((data) => setComments(data))
        setNewComment(initialState)
    }

    useEffect(() => {
        getAll()
    }, [])

    const inputHandler = (e) => {
        const { id, value } = e.target;
        setNewComment({ ...newComment, [id]: value })
    }
    const postSubmit =  (e) => {
        e.preventDefault();

        const { content, author, project } = newComment

        const newCommentObj = {
          content,
          author: currentUser,
          project: parseInt(currentProject)
        }


        createComment(newCommentObj).then(getAll)
    }

    const projectComments = comments.filter(comment => comment.project.id === parseInt(currentProject))

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
                        <Badge style={{ margin: "6px" }} pill bg="secondary"><h6>Comments</h6></Badge>
                    </Row>
                    <Row>
                        {projectComments.map(comment => {
                            return (
                                <Row sm key={`comment--${comment.id}`} className="comment">
                                    <Stack gap="2" style={{ padding: "0px" }}>
                                        {comment.author.user?.username}: {comment.content}
                                            <Col style={{ display: 'flex',margin: "6px", justifyContent: 'flex-end' }}>
                                               {parseInt(currentUser)===comment.author?.id ? <Button variant="outline-danger" size="small" onClick={() => deleteComment(comment.id).then(getAll)}>Remove</Button> : <div></div>}
                                            </Col>
                                    </Stack>
                                </Row>
                            )
                        })}
                    </Row>
                    <Row>
                        <Container style={{ display: 'flex' }}>
                            <textarea id="content" type="text" value={newComment.content} onChange={inputHandler} required placeholder="add comment" />
                            <Button size="small" style={{ justifyContent: 'flex-end', marginLeft: "6px" }} onClick={postSubmit}>Post</Button>
                        </Container>
                    </Row>
                </Container>
            </Container>
        </section>
    )
}
