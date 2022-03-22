import React, { useRef, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Breadcrumb, Button, Card, Form, FormGroup } from 'react-bootstrap'
import { getSingleEvent, updateEvent } from "./EventsManager"
import DatePicker from "react-datepicker";
import addDays from 'date-fns/addDays'
import "react-datepicker/dist/react-datepicker.css";


export const EventUpdate = () => {
    const history = useHistory()
    const { currentEvent } = useParams()
    const [event, setEvent] = useState([])
    const [eventUpdate, setEventUpdate] = useState([])
    const [eventDate, setEventDate] = useState(new Date());
    useEffect(() => {
        getSingleEvent(currentEvent).then(data => { setEvent(data) })
     }, [])


    const inputHandler = (e) => {
        const { id, value } = e.target;
        setEventUpdate({ ...event, [id]: value })
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const { date, description,type } = eventUpdate

        const EventObj = {
            id: currentEvent,
            date: eventDate,
            description:`${description ? description : event.description}`,
            type:`${type ? type : event.type}`
        }
        
       updateEvent(EventObj).then(() => history.push("/events"))
    };
    console.log(event)
    console.log(eventDate)
    console.log(event.date)
    return (
        <>
            <Container>
                <Form>
                    <FormGroup >
                        <Form.Label>Type Of Event</Form.Label>
                        <Form.Control id="type" type="text" defaultValue={event.type} onChange={inputHandler} required placeholder="Swap Meet" />
                        <Form.Text className="text-muted">
                            This is the "Type" of event: Show and Shine, Swap Meet, WorkShop
                        </Form.Text>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Description</Form.Label>
                        <Form.Control id="description" type="text" defaultValue={event.description} onChange={inputHandler} required placeholder="The event takes places at the fairgrounds bring your cooler and parts!" />
                        <Form.Text className="text-muted">
                            What are the details?
                        </Form.Text>
                    </FormGroup>
                    <FormGroup>
                        <DatePicker 
                            selected={eventDate}
                            defaultValue={event.date}
                            onChange={(date) => setEventDate(date)}
                            id="date"
                            name="date"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 365)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={20}
                            timeCaption="time"
                        />
                             <Form.Text className="text-muted">
                            Select the Date and Time of the event
                        </Form.Text>
                    </FormGroup>
                    <Button variant="success" onClick={handleOnSubmit}>Update Event</Button>
                </Form>
            </Container>
        </>
    )
}
