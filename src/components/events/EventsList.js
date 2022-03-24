import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Badge, Button, Form, Card, FormGroup, Image, Stack } from 'react-bootstrap'
import { getEvents } from './EventsManager'




export const EventsList = () => {
    const history = useHistory()
    const [events, setEvents] = useState([])
    const currentUser = parseInt(localStorage.getItem("currentUser"))

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])




    return (
        <>
            <section style={{ background: "#282c34", color: "#fff" }}>
                <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px", textAlign: 'center' }}>
                    <Col>
                        <Row style={{ justifyContent: 'center' }}>
                            <Button variant="secondary" size="sm" onClick={() => { history.push({ pathname: `/events/new` }) }} style={{ padding: "10px,5px", margin: "4px", textAlign: "center", width: 'fit-content' }}>
                                <h2>Create New Event</h2>
                            </Button>
                        </Row>
                        {events.map(event => {
                            return (
                                // <Stack gap="2" style={{ padding: "0px", maxWidth:"500px" }}>
                                <Row style={{ justifyContent: 'center' }}>
                                    <Card style={{ padding: "10px,5px", margin: "4px", backgroundColor: "#6c757d", width: "18rem" }}>
                                        <Card.Header style={{ background: "#282c34"}}>Event: {event.type}</Card.Header>
                                        <Card.Body>
                                        <Card.Text>
                                            Participants: {event.attendees?.length} 
                                        </Card.Text>
                                        <Card.Text>
                                           {event.creator?.id === currentUser ? "Hosting" : ""}
                                        </Card.Text>
                                        <Button variant="dark" size="small" onClick={() => { history.push({ pathname: `/events/${event.id}` }) }} style={{ padding: "10px,5px", margin: "4px", textAlign: "center", width: 'fit-content' }}>
                                            View
                                        </Button>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                //</Stack> 
                            )
                        })}
                    </Col>
                </Container>
            </section>
        </>
    )
}