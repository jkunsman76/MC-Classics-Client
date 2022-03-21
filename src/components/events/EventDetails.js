import React, { useRef, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Breadcrumb, Button, Card, Form, FormGroup } from 'react-bootstrap'
import { getSingleEvent, leaveEvent, joinEvent,deleteEvent } from "./EventsManager"


export const EventDetails = () => {
    const history = useHistory()
    const { currentEvent } = useParams()
    const [event, setEvent] = useState([])
    const currentUser = parseInt(localStorage.getItem("currentUser"))

    useEffect(() => {
        getSingleEvent(currentEvent).then(data => { setEvent(data) })
    }, [])

    console.log(event)
const buttonLogic = () => { 
    if(event.creator?.id === currentUser){ 
    return (<><Button variant="warning" size="sm" style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} onClick={() => history.push(`/events/${currentEvent}/update`)}>Edit Event</Button>
    <Button variant="danger" size="sm" style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} onClick={() => deleteEvent(currentEvent).then(history.push('/events'))}>Delete</Button></>)
}else return (
    event.joined ? <Button variant="warning" onClick={() => {
        leaveEvent(event.id).then(history.push('/events'))
    }} >Leave Event</Button> : <Button variant="success" onClick={() => {
    joinEvent(event.id).then(history.push('/events'))
}}>Join Event</Button> )
   
}



    return (
        <>
            <Container>
                <Form>
                    <FormGroup >
                        <Form.Label>Type Of Event</Form.Label>
                        <Form.Control disabled id="type" type="text" defaultValue={event.type} />

                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Description</Form.Label>
                        <Form.Control disabled id="description" type="text" defaultValue={event.description} />

                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Date and time</Form.Label>
                        <Form.Control disabled id="description" type="text" defaultValue={event.date} />
                    </FormGroup>
                   {buttonLogic()}
                </Form>
            </Container>
        </>
    )
}
// onChange={inputHandler}
// onChange={inputHandler}
// onClick={handleOnSubmit}