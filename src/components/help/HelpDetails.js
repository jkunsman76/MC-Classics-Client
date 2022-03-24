import React, { useRef, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Stack, Button, Card, Form, FormGroup } from 'react-bootstrap'
import { getSingleHelpRequest, deleteHelpRequest} from "./HelpManager"
// import { getComments, createComment, deleteComment } from '../comments/CommentsManager'

// const initialState = {
//     content: "", author: "", project: ""
// };

export const HelpDetails = () => {
    const history = useHistory()
    const { currentRequest } = useParams()
    const [request, setRequest] = useState([])
    const currentUser = parseInt(localStorage.getItem("currentUser"))
    // const [comments, setComments] = useState([])
    // const [newComment, setNewComment] = useState(initialState)


    const syncData = () => {
        getSingleHelpRequest(currentRequest).then(data => { setRequest(data) })
        // getComments().then((data) => setComments(data))
        // setNewComment(initialState)
    }

    useEffect(() => {
       syncData()
    }, [])

console.log(currentUser)
console.log(request)
    // console.log(request)
    const buttonLogic = () => {
        if (request.author?.id === currentUser) {
            return (<><Button variant="outline-warning" size="sm" style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} onClick={() => history.push(`/help/${currentRequest}/update`)}>Edit Request</Button>
                <Button variant="outline-danger" size="sm" style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} onClick={() => deleteHelpRequest(currentRequest).then(history.push('/help'))}>Delete</Button></>)
        } else return("")

    }

    // const inputHandler = (e) => {
    //     const { id, value } = e.target;
    //     setNewComment({ ...newComment, [id]: value })
    // }
    // const postSubmit = (e) => {
    //     e.preventDefault();

    //     const { content, author, project } = newComment

    //     const newCommentObj = {
    //         content,
    //         author: currentUser,
    //         project: parseInt(currentRequest)
    //     }


    //     createComment(newCommentObj).then(syncData)
    // }

    // const projectComments = comments.filter(comment => 
    //     comment.project.id === parseInt(currentRequest))

    return (
        <>
            <section style={{ background: "#282c34", color: "#fff" }}>
                <Container>
                    <Form>
                        <FormGroup >
                            <Form.Label>Requested By User: {request.author?.user?.username} </Form.Label>
                        </FormGroup>
                            <Form.Label>Project Name: {request.project?.title}</Form.Label>
                        <FormGroup >
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Details:</Form.Label>
                            <Form.Control readOnly id="description" style={{height:"150px"}}  as="textarea" rows={5}  defaultValue={request.content} />
                        </FormGroup>
                        {buttonLogic()}
                    </Form>
                </Container>
                {/* <Row>
                        {projectComments.map(comment => {
                            return (
                                <Row sm key={`comment--${comment.id}`} className="comment">
                                    <Stack gap="2" style={{ padding: "0px" }}>
                                        {comment.author.user?.username}: {comment.content}
                                        <Col style={{ display: 'flex', margin: "6px", justifyContent: 'flex-end' }}>
                                            {parseInt(currentUser) === comment.author?.id ? <Button variant="outline-danger" size="small" onClick={() => deleteComment(comment.id).then(syncData)}>Remove</Button> : <div></div>}
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
                    </Row> */}
            </section>
        </>
    )
}
