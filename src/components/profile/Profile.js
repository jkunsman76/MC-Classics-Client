import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getCurrentProfile, deleteProfile } from "./ProfileManager"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Image, Stack } from 'react-bootstrap'
import { getAllHelpRequests } from '../help/HelpManager'

//! pick up at help requests in JSX. 
//TODO need to write code to toggle disable/enable of FormControl onClick of the edit button.
export const Profile = () => {
    const [profile, setProfile] = useState({})
    const currentUser = parseInt(localStorage.getItem("currentUser"))
    const [helpRequests, setHelpRequests] = useState([])


    useEffect(() => {
        getCurrentProfile()
            .then(data => setProfile(data))
            getAllHelpRequests().then(data => setHelpRequests(data))
    }, [])

    const helpRequestFilter = (array) => {
        const filteredHelpRequests = array.filter(helpRequest => helpRequest.author?.id === currentUser)
        return filteredHelpRequests
    }

    // console.log(helpRequestFilter(helpRequests))
    // console.log(currentUser)
    // console.log(profile)

    //TODO this is boiler code to stack the columns when the window is small
    //TODO i need to use Stack but dont want to rerender the jsx....
    // const showButton = () => {
    //     if (window.innerWidth <= 960) {
    //         setButton(false);
    //     } else {
    //         setButton(true);
    //     }
    // };

    // useEffect(() => {
    //     showButton();
    // }, []);

    // window.addEventListener('resize', showButton);





    return (
        <>
            <Container fluid style={{ paddingTop: "10px", background: "#282c34", color: "#fff" }}>
                <Row>
                    <Col sm={{ order: 1 }} md={{ span: 6 }} lg={{ span: 6 }}>
                        <Container fluid>
                            <Form >
                                <Stack>
                                    <FormGroup >
                                        <Stack>
                                            <Badge bg="secondary" style={{ textAlign: "center" }}>
                                                <h3>{profile.user?.username}'s Profile</h3>
                                            </Badge>
                                            <FormGroup>
                                                <Form.Label>Joined On: {profile.user?.date_joined}</Form.Label>
                                            </FormGroup>
                                            <Form.Label>First Name:</Form.Label>
                                            <Form.Control disabled={true} id="title" type="text" defaultValue={profile.user?.first_name} required placeholder="John" />
                                            <Form.Label>Last Name:</Form.Label>
                                            <Form.Control disabled={true} id="title" type="text" defaultValue={profile.user?.last_name} required placeholder="Deer" />
                                        </Stack>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Email Address:</Form.Label>
                                        <Form.Control disabled={true} id="make" type="text" defaultValue={profile.user?.email} required placeholder="Make" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Bio:</Form.Label>
                                        <Form.Control disabled={true} id="model" type="text" defaultValue={profile.bio} required placeholder="Model " />
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Profile Picture</Form.Label>
                                        <Form.Control disabled={true} id="image" type="file" size="sm" multiple defaultValue={""} />
                                    </FormGroup>
                                </Stack>
                            </Form>
                            <Image thumbnail src={profile.profile_img} />
                            <Row>
                                <Button variant="outline-warning" size="sm" >Edit Profile</Button>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={{ order: 0 }} md={{ span: 3 }} lg={{ span: 3 }} >

                        My Help Requests
                       {helpRequestFilter(helpRequests).map(request => {
                            return (
            <Container key={`request--${request.id}`} className="request" >
                <Row sm>
                    <Badge style={{margin:"2px"}} pill bg="secondary"><h5>{request.title}</h5></Badge>
                </Row>
                </Container>)})} 
                       
                    </Col>
                    <Col sm={{ order: 2 }} md={{ span: 3 }} lg={{ span: 3 }}>My Upcoming Events</Col>
                </Row>
            </Container>
        </>
    )
}