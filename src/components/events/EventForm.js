import React, { useRef, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Breadcrumb, Button, Card, Form, FormGroup } from 'react-bootstrap'
import { createEvent } from "./EventsManager"
import DatePicker from "react-datepicker";
import addDays from 'date-fns/addDays'
import "react-datepicker/dist/react-datepicker.css";

const initialState = {
    date: "", description: "", type: ""
};

export const EventForm = () => {
    const history = useHistory()
    const [newEvent, setNewEvent] = useState(initialState)
    const [eventDate, setEventDate] = useState(new Date());
    useEffect(() => { }, [newEvent])


    const inputHandler = (e) => {
        const { id, value } = e.target;
        setNewEvent({ ...newEvent, [id]: value })
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const { date, description, type } = newEvent

        const newEventObj = {
            date: eventDate,
            description,
            type,
        }

        createEvent(newEventObj).then(() => history.push("/events"))
    };

    return (
        <>
            <section style={{ background: "#282c34", color: "#fff" }}>
                <Container>
                    <Form>
                        <FormGroup >
                            <Form.Label>Type Of Event</Form.Label>
                            <Form.Control id="type" type="text" defaultValue={newEvent.type} onChange={inputHandler} required placeholder="Swap Meet" />
                            <Form.Text className="text-muted">
                                This is the "Type" of event: Show and Shine, Swap Meet, WorkShop
                            </Form.Text>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Description</Form.Label>
                            <Form.Control id="description" type="text" defaultValue={newEvent.description} onChange={inputHandler} required placeholder="The event takes places at the fairgrounds bring your cooler and parts!" />
                            <Form.Text className="text-muted">
                                What are the details?
                            </Form.Text>
                        </FormGroup>
                        <FormGroup>
                            <DatePicker
                                selected={eventDate}
                                onChange={(date) => setEventDate(date)}
                                id="date"
                                name="eventDate"
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
                        <Button variant="success" onClick={handleOnSubmit}>Create Event</Button>
                    </Form>
                </Container>
            </section>
        </>
    )
}
