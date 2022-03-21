import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Image, Stack } from 'react-bootstrap'
import { getEvents } from './EventsManager'




export const EventsList = () => {
    const history = useHistory()
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
      }, [])




    return (
        <>
            <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px", textAlign: 'center' }}>
                <Button variant="secondary" size="sm" onClick={() => { history.push({ pathname: `/events/new` }) }} style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }}><h2>Create New Event</h2></Button>
                { events.map(event => {
                            return ( 
                    <Row sm key={`event--${event.id}`} className="event">
                            <Stack gap="2" style={{ padding: "0px" }}>
                            {console.log(event)}
                                <Button style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} size="sm" variant="dark" onClick={() => history.push(`/events/${event.id}`)}><p style={{ marginBottom: "0px" }}>{event.type} </p></Button>
                            </Stack>
                        </Row>
                    )
                })}
            </Container>
        </>
    )




}