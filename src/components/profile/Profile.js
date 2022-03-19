import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getCurrentProfile, deleteProfile,updateProfile } from "./ProfileManager"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Image, Stack } from 'react-bootstrap'
import { getAllHelpRequests } from '../help/HelpManager'
import { getEvents } from '../events/EventsManager'


//TODO need to finish update functionality for profile information 
//TODO need to get the django user user info to update in state
//TODO cant use optional chaining to update the profile
//! i give up

const initialState = {
username:"",
first_name:"",
last_name:"",
email:"",
bio:"",
profile_img :""
}

export const Profile = () => {
    const history = useHistory()
    const [profile, setProfile] = useState(initialState)
    const currentUser = parseInt(localStorage.getItem("currentUser"))
    const [helpRequests, setHelpRequests] = useState([])
    const [events, setEvents] = useState([])
    const [formStatus, setFormStatus] = useState()
    const [userObj, setUser] = useState({})
    
    useEffect(() => {
        getCurrentProfile()
            .then(data => setProfile(data))
        getAllHelpRequests()
        .then(data => setHelpRequests(data))
        getEvents()
        .then(data => setEvents(data))
        setFormStatus(true)
    }, [])
    useEffect(() => {
      setUser(findObj())
    },[profile])

    const findObj = () => {
        const profileArray = {...profile}
        const n = Object.values(profileArray)
        const result = n.find((value,index)=>{if(index === 3){return n[3]}})
        return result
    }
    
console.log(userObj)
const inputHandler = (e) => {
    // Target = id of JSX and value = defaultValue
    const { id, value } = e.target;

    setProfile({ ...profile, [id]: value })
};

const handleOnSubmit = (e) => {
    e.preventDefault();

    const { username, first_name, last_name, email, profile_img, bio } = profile

    const ProfileObj = {
        id:currentUser,
        username,
        first_name,
        last_name,
        email,
        bio,
        profile_img  
    }
    console.log(ProfileObj)
    updateProfile(ProfileObj).then(getCurrentProfile().then(setFormStatus(true)))
};

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
            return btn=<Button variant="outline-success" size="sm" style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} onClick={handleOnSubmit}>Update Profile</Button>
        }
        return btn
    }

    const deleteButton = () => {
        let btn=null
        if (!formStatus) {
            return btn=<Button variant="danger" size="sm" style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }} onClick={() => deleteProfile(profile.id).then(history.push('/'))}>Delete Profile</Button>
        }
        return btn
    }

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
                                            <Badge bg="secondary" id="username" style={{ textAlign: "center" }}>
                                                <h3>{profile.user?.username}'s Profile</h3>
                                            </Badge>
                                            <FormGroup>
                                                <Form.Label>Joined On: {profile.user?.date_joined.slice(0, 10)} {deleteButton()}</Form.Label>
                                            </FormGroup>
                                            <Form.Label>First Name:</Form.Label>
                                            <Form.Control disabled={formStatus} id="username" type="text" defaultValue={profile.user?.username} onChange={inputHandler} required placeholder="" />
                                            <Form.Label>First Name:</Form.Label>
                                            <Form.Control disabled={formStatus} id="first_name" type="text" defaultValue={profile.user?.first_name} onChange={inputHandler} required placeholder="" />
                                            <Form.Label>Last Name:</Form.Label>
                                            <Form.Control disabled={formStatus} id="last_name" type="text" defaultValue={profile.user?.last_name} onChange={inputHandler} required placeholder="" />
                                        </Stack>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Email Address:</Form.Label>
                                        <Form.Control disabled={formStatus} id="email" type="email" defaultValue={profile.user?.email} onChange={inputHandler} required placeholder="" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Bio:</Form.Label>
                                        <Form.Control disabled={formStatus} id="bio" type="text" defaultValue={profile.bio} onChange={inputHandler} required placeholder="" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Profile Picture</Form.Label>
                                        <Form.Control disabled={formStatus} id="img" type="file" size="sm" multiple defaultValue={""} />
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
                                )})}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}