import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom"

export const Footer = () => {
    const history = useHistory()
    return (
        <>
            <Container fluid style={{ textAlign: "center", background: "#282c34", color: "#fff", position: "fixed", bottom: 0, width: "100%", height: "8%" }}>
                <Container style={{ display: "flex", justifyContent: 'space-evenly',background: "#282c34", width: "100%" }}>
                    <Button variant='Link' href='/' style={{padding: '0.375rem',alignSelf: 'center',background: "#282c34", color: "white", fontWeight: "bold" }}>Home</Button>
                    <Button variant='Link' href='/projects/usersprojects' style={{padding: '0.375rem', background: "#282c34", color: "white", fontWeight: "bold" }}>My Projects</Button>
                    <Button variant='Link' href='/events/usersevents' style={{padding: '0.375rem', background: "#282c34", color: "white", fontWeight: "bold" }}>My Events</Button>
                    <Button variant="Link" href='/login' style={{padding: '0.375rem', background: "#282c34", color: "white", fontWeight: "bold" }} onClick={() => {localStorage.clear()}}>Log Out</Button>
                </Container>
            </Container>
        </>
    );
}
