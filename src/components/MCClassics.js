import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getProjects } from "./projects/ProjectsManager"
import { getEvents } from './events/EventsManager'
import { getAllHelpRequests } from './help/HelpManager'
import { Container, Row, Col, Badge, Button, Card, Image, Stack } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export const MCClassics = () => {
  const history = useHistory()
  const [projects, setProjects] = useState([])
  const currentUser = parseInt(localStorage.getItem("currentUser"))
  const [helpRequests, setHelpRequests] = useState([])
  const [events, setEvents] = useState([])
  const [formStatus, setFormStatus] = useState()

  useEffect(() => {
    getProjects()
      .then(data => setProjects(data))
    getAllHelpRequests().then(data => setHelpRequests(data))
    getEvents().then(data => setEvents(data))
    // setFormStatus(true)
  }, [])

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  return (
    <>
      <section style={{ background: "#282c34", color: "#fff" }}>
        <Container fluid style={{ paddingTop: "10px", background: "#282c34", color: "#fff" }}>
          <Row style={{ textAlign: 'center', padding: "4px" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "var(--bs-body-font-weight)" }}>Welcome to Music City Classics</h1>
          </Row>
          <Row>
            <Col sm={{ order: 0 }} md={{ span: 6, order: 1 }} lg={{ span: 6 }} style={{ textAlign: 'center', padding: "0px", marginTop: '0.5rem' }}>
              <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px", textAlign: 'center' }}>
                <Button variant="secondary" size="sm" onClick={() => { history.push({ pathname: `/projects` }) }} style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }}>All Projects</Button>
                {shuffleArray(projects).slice(0, 5).map(project => {
                  return (
                    <Container >
                      <Row sm key={`project--${project.id}`} className="project">
                        {/* <Stack gap="2" style={{ padding: "0px" }}> */}
                        <Card style={{ padding: "10px,5px", margin: "4px", backgroundColor: "#6c757d" }}>
                          <Card.Img variant="top" src={"http://localhost:8000" + project.image} style={{marginTop:'.25rem'}} />
                          <Card.Title>{project.title}</Card.Title>
                          <Card.Text>
                            {project.details}
                          </Card.Text>
                          <Button variant="dark" size="small" onClick={() => { history.push({ pathname: `/projects/${project.id}` }) }}>View</Button>
                        </Card>
                        {/* </Stack> */}
                      </Row>
                    </Container>
                  )
                })}
              </Container>
            </Col>
            <Col sm={{ order: 1 }} md={{ span: 3, order: 0 }} lg={{ span: 3 }} style={{ textAlign: 'center', padding: "0px", background: "#191b20", borderRadius: ".5rem",marginTop: '0.5rem' }} >
              <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px", textAlign: 'center' }}>
                <Button variant="secondary" size="sm" onClick={() => { history.push({ pathname: `/help` }) }} style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }}> All Help Requests</Button>
                {shuffleArray(helpRequests).map(request => {
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
            <Col sm={{ order: 2 }} md={{ span: 3, order: 2 }} lg={{ span: 3 }} style={{ padding: "0px", textAlign: 'center', background: '#191b20', borderRadius: ".5rem",marginTop: '0.5rem' }}>
              <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px", textAlign: 'center' }}>
                <Button variant="secondary" size="sm" onClick={() => { history.push({ pathname: `/events` }) }} style={{ padding: "10px,5px", margin: "4px", textAlign: "center" }}> All Events</Button>
                {shuffleArray(events).map(event => {
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
      </section>
    </>
  )
}