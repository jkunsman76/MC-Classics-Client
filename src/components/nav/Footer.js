import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom"

export const Footer=() => {
    const history = useHistory()
    return (
        <div style={{textAlign: "center", background: "#282c34", color: "#fff" }}>
            <Container fluid>
                <h2 >
                    Join the best classic car forum in Music City today!
                </h2>
                <Button variant="primary" size="large" onClick={() => {
                                localStorage.clear()
                                history.push({ pathname: "/login" })
                            }}>Log Out</Button>
            </Container>
            <Container style={{ display: "flex", justifyContent: 'space-between' }}>
                <Button variant='Link' href='https://jkunsman76.github.io/' style={{ background: "#282c34", color: "white", fontWeight: "bold" }}>Creator Website</Button>
                <Button variant='Link' href='https://github.com/jkunsman76' style={{ background: "#282c34", color: "white", fontWeight: "bold" }}>GitHub</Button>
                <Button variant='Link' href='https://www.linkedin.com/in/jkunsman2021/' style={{ background: "#282c34", color: "white", fontWeight: "bold" }}>LinkedIn</Button>
                <Button variant='Link' href='/' style={{ background: "#282c34", color: "white", fontWeight: "bold" }}>Home</Button>
            </Container>
        </div>
    );
}
