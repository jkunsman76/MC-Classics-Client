import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Breadcrumb, Button, Card, Form, FormGroup } from 'react-bootstrap'

export const MCClassics = () => {
    return(
    
     <div className="App">
       <header className="App-header"style={{display: "flex", justifyContent: "flex-start"}}>
         <Container >
           <Card className="App-main-card" style={{ color: "#000" }}>
             <Card.Title style={{ margin: "4px", padding: "4px", color: "#681fa5", bold: true, fontSize: "48px", font: "Roboto " }}>MC Classics</Card.Title>
             <Card.Text>Music City's number one classic car forum.</Card.Text>
           </Card>
         </Container>
         <Container>
           
         </Container>
       </header>

     </div>
    )
}
