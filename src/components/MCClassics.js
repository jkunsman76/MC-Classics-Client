import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Breadcrumb, Button, Card, Form, FormGroup } from 'react-bootstrap'

function MCClassics () {
    return(
    
     <div className="App">
       <header className="App-header"style={{display: "flex", justifyContent: "flex-start"}}>
         <Container >
           <Card className="App-main-card" style={{ color: "#000" }}>
             <Card.Title style={{ margin: "4px", padding: "4px", color: "#681fa5", bold: true, fontSize: "48px", font: "Roboto " }}>MC Classics</Card.Title>
             <Card.Text>Music Cities number one classic car forum.</Card.Text>
           </Card>
         </Container>
         <Container style={{textAlign: "-webkit-center"}}>
           <Form style={{ maxWidth: "75%" }}>
             {/* <Row>
               <Col md >
                 <FormGroup controlId="formUsername">
                   <Form.Label>Username</Form.Label>
                   <Form.Control type="username" placeholder="Enter your Username" />
                 </FormGroup>
               </Col>
               <Col md>
                 <FormGroup controlId="formPassword">
                   <Form.Label>Password</Form.Label>
                   <Form.Control type="password" placeholder="Enter your Password" />
                 </FormGroup>
               </Col>
             </Row> 
             <Button variant="secondary" href="/api/login" style={{ margin: "4px" }}>Login</Button>*/}
           </Form>
         </Container>
       </header>

     </div>
    )
}
export default MCClassics