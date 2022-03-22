import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Image, Stack } from 'react-bootstrap'
import { getUsersEvents, getEvents } from './EventsManager'




export const EventsUser = () => {
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("currentUser"))
    const [events, setEvents] = useState([])
    const [allEvents, setAllEvents] = useState([])

    useEffect(() => {
        getUsersEvents().then(data => setEvents(data))
        getEvents().then(data => setAllEvents(data))
    }, [])

    const going = () => {
        const attending = allEvents.filter(event => event.joined === true)
        return attending
    }
    console.log(allEvents)
    console.log(going())
    console.log(currentUser)

    return (
        <>
            <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px", textAlign: 'center' }}>
                <h2>My Hosted Events</h2>
                <Button variant="secondary" size="sm" onClick={() => { history.push({ pathname: `/events/new` }) }} style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }}><h2>Create New Event</h2></Button>
                {events.map(event => {
                    return (
                        <Row sm key={`event--${event.id}`} className="event">
                            <Stack gap="2" style={{ padding: "0px" }}>
                                <Button style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} size="sm" variant="dark" onClick={() => history.push(`/events/${event.id}`)}><p style={{ marginBottom: "0px" }}>{event.type} </p></Button>
                            </Stack>
                        </Row>
                    )
                })}
            </Container>
            <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px", textAlign: 'center' }}>
                <h2>Events I'm Attending</h2>
                {going().map(event => {
                    return (
                        <Row sm key={`event--${event.id}`} className="event">
                            <Stack gap="2" style={{ padding: "0px" }}>
                                <Button style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} size="sm" variant="dark" onClick={() => history.push(`/events/${event.id}`)}><p style={{ marginBottom: "0px" }}>{event.type} </p></Button>
                            </Stack>
                        </Row>
                    )
                })}
            </Container>
        </>
    )




}