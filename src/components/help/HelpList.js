import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Badge, Button, Form, Card, FormGroup, Image, Stack } from 'react-bootstrap'
import { getAllHelpRequests } from './HelpManager'




export const HelpRequestsList = () => {
    const history = useHistory()
    const [helpRequests, setHelpRequests] = useState([])
    const currentUser = parseInt(localStorage.getItem("currentUser"))

    useEffect(() => {
        getAllHelpRequests().then(data => setHelpRequests(data))
    }, [])



console.log(helpRequests)
    return (
        <>
            <section style={{ background: "#282c34", color: "#fff" }}>
                <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px", textAlign: 'center' }}>
                    <Col>
                        <Row style={{ justifyContent: 'center' }}>
                            <Button variant="secondary" size="sm" onClick={() => { history.push({ pathname: `/help/new` }) }} style={{ padding: "10px,5px", margin: "4px", textAlign: "center", width: 'fit-content' }}>
                                <h2>Create Help Request</h2>
                            </Button>
                        </Row>
                        {helpRequests.reverse().map(request => {
                            return (
                                <Row style={{ justifyContent: 'center' }}>
                                    <Card style={{ padding: "10px,5px", margin: "4px", backgroundColor: "#6c757d", width: "25rem" }}>
                                        <Card.Header style={{marginTop:'5px', background: "#282c34",borderRadius: ".5rem" }}>Send Help!</Card.Header>
                                        <Card.Subtitle  style={{padding: "10px", alignSelf: "flex-start", color: 'black'}}>{request.author?.user?.username}'s Request:</Card.Subtitle>
                                        <Card.Body> {console.log(request.id)}
                                            <Card.Text style={{color:'black'}}>
                                            {request.content}
                                            </Card.Text>
                                            <Button variant="dark" size="small" onClick={() => { history.push({ pathname: `/help/${request.id}` }) }} style={{ padding: "10px,5px", margin: "4px", textAlign: "center", width: 'fit-content' }}>
                                                View
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            )
                        })}
                    </Col>
                </Container>
            </section>
        </>
    )
}