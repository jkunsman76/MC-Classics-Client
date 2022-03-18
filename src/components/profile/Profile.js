import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getCurrentProfile, deleteProfile } from "./ProfileManager"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Image, Stack } from 'react-bootstrap'
import { getAllHelpRequests } from '../help/HelpManager'
import { getEvents } from '../events/EventsManager'
import {ProfileUpdate} from '../profile/ProfileUpdate'

//TODO need to finish update functionality for profile information

export const Profile = () => {
    const history = useHistory()
    const [profile, setProfile] = useState({})
    const currentUser = parseInt(localStorage.getItem("currentUser"))
    const [helpRequests, setHelpRequests] = useState([])
    const [events, setEvents] = useState([])
    const [formStatus, setFormStatus] = useState()

    useEffect(() => {
        getCurrentProfile()
            .then(data => setProfile(data))
        getAllHelpRequests().then(data => setHelpRequests(data))
        getEvents().then(data => setEvents(data))
        setFormStatus(true)
    }, [])

console.log()
    const eventFilter = (array) => {
        const filteredEvents = array.filter(event => event.creator?.id === currentUser)
        return filteredEvents
    }

    const helpRequestFilter = (array) => {
        const filteredHelpRequests = array.filter(helpRequest => helpRequest.author?.id === currentUser)
        return filteredHelpRequests
    }

    const enableFormEdit = () => {
        if (formStatus) {
            setFormStatus(false)
        } else setFormStatus(true)
        return formStatus
    }

    const updateButton = () => {
        let btn=null
        if (!formStatus) {
            return btn=<Button variant="outline-success" size="sm" style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} onClick={() => { enableFormEdit() }}>Update Profile</Button>
        }
        return btn
    }

console.log(profile)
    return (
        <>
            <Container fluid style={{ paddingTop: "10px", background: "#282c34", color: "#fff" }}>
                <Row>
                    <Col sm={{ order: 0 }} md={{ span: 6, order: 1 }} lg={{ span: 6 }} style={{ padding: "0px" }}>
                        <Container fluid>
                            <Form >
                                <Stack>
                                    <FormGroup >
                                        <Stack>
                                            <Badge bg="secondary" style={{ textAlign: "center" }}>
                                                <h3>{profile.user?.username}'s Profile</h3>
                                            </Badge>
                                            <FormGroup>
                                                <Form.Label>Joined On: {profile.user?.date_joined.slice(0, 10)}</Form.Label>
                                            </FormGroup>
                                            <Form.Label>First Name:</Form.Label>
                                            <Form.Control disabled={formStatus} id="title" type="text" defaultValue={profile.user?.first_name} required placeholder="John" />
                                            <Form.Label>Last Name:</Form.Label>
                                            <Form.Control disabled={formStatus} id="title" type="text" defaultValue={profile.user?.last_name} required placeholder="Deer" />
                                        </Stack>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Email Address:</Form.Label>
                                        <Form.Control disabled={formStatus} id="make" type="text" defaultValue={profile.user?.email} required placeholder="Make" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Bio:</Form.Label>
                                        <Form.Control disabled={formStatus} id="model" type="text" defaultValue={profile.bio} required placeholder="Model " />
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Profile Picture</Form.Label>
                                        <Form.Control disabled={formStatus} id="image" type="file" size="sm" multiple defaultValue={""} />
                                    </FormGroup>
                                </Stack>
                            </Form>
                            <Image thumbnail src={profile.profile_img} />
                            <Row>
                                <Button variant="outline-warning" size="sm" style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} onClick={() => { enableFormEdit() }}>{formStatus ? 'Edit Profile ' : 'Cancel Edit'}</Button>
                               {updateButton()}
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={{ order: 1 }} md={{ span: 3, order: 0 }} lg={{ span: 3 }} style={{ textAlign: 'center', padding: "0px" }} >
                        <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px", textAlign: 'center' }}>
                            <Button variant="secondary" size="sm" onClick={() => { history.push({ pathname: `/help` }) }} style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }}>My Help Requests</Button>
                            {helpRequestFilter(helpRequests).map(request => {
                                return (

                                    <Row sm key={`request--${request.id}`} className="request">
                                        <Stack gap="2" style={{ padding: "0px" }}>
                                            <Button style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} size="sm" variant="dark" onClick={() => {
                                                history.push({ pathname: `/help/${request.id}` })
                                            }}><p style={{ marginBottom: "0px" }}>{request.project?.title}: {request.content.slice(0, 15)}...</p></Button>
                                        </Stack>
                                    </Row>
                                )
                            })}
                        </Container>
                    </Col>
                    <Col sm={{ order: 2 }} md={{ span: 3, order: 2 }} lg={{ span: 3 }} style={{ padding: "0px", textAlign: 'center' }}>
                        <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px", textAlign: 'center' }}>
                            <Button variant="secondary" size="sm" onClick={() => { history.push({ pathname: `/events` }) }} style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }}>My Events</Button>
                            {eventFilter(events).map(event => {
                                return (

                                    <Row sm key={`event--${event.id}`} className="event">
                                        <Stack gap="2" style={{ padding: "0px" }}>
                                            <Button style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} size="sm" variant="dark" onClick={() => {
                                                history.push({ pathname: `/events/${event.id}` })
                                            }}><p style={{ marginBottom: "0px" }}>{event.type}</p></Button>
                                        </Stack>
                                    </Row>
                                )
                            })}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}