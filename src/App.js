import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/nav/NavBar';
import { Footer } from './components/nav/Footer';
import { MCClassics } from './components/MCClassics';
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { ProjectsForm } from './components/projects/ProjectsForm'
import { ProjectsList } from './components/projects/ProjectsList'
import { ProjectsUpdate } from './components/projects/ProjectsUpdate'
import { ProjectsUser } from './components/projects/ProjectsUser'
import { ProjectView } from './components/projects/ProjectView'
import { Profile } from './components/profile/Profile'
import { EventsList } from './components/events/EventsList'
import { EventForm } from './components/events/EventForm'
import { EventDetails } from './components/events/EventDetails'
import { EventsUser } from './components/events/EventsUser'
import { EventUpdate } from './components/events/UpdateEvent'
import { HelpRequestsList } from './components/help/HelpList'
import { HelpDetails } from './components/help/HelpDetails'
import { HelpForm } from './components/help/HelpForm'
import { HelpUpdate } from './components/help/HelpUpdate'

function App() {
  return (
    <>
      <Router>
        <Route render={() => {
          if (localStorage.getItem("mc_token")) {
            return <>
              <NavBar />
              <Switch>
                <Route exact path="/">
                  <MCClassics />
                </Route>
                <Route exact path="/projects">
                  <ProjectsList />
                </Route>
                <Route exact path="/projects/:currentProject(\d+)/update">
                  <ProjectsUpdate />
                </Route>
                <Route exact path="/projects/:currentProject(\d+)">
                  <ProjectView />
                </Route>
                <Route exact path="/projects/usersprojects">
                  <ProjectsUser />
                </Route>
                <Route exact path="/projects/new">
                  <ProjectsForm />
                </Route>
                <Route exact path="/profiles/currentuser">
                  <Profile />
                </Route>
                <Route exact path="/events">
                  <EventsList />
                </Route>
                <Route exact path="/events/new">
                  <EventForm />
                </Route>
                <Route exact path="/events/:currentEvent(\d+)">
                  <EventDetails />
                </Route>
                <Route exact path="/events/:currentEvent(\d+)/update">
                  <EventUpdate />
                </Route>
                <Route exact path='/events/usersevents'>
                  <EventsUser />
                </Route>
                 <Route exact path='/help/:currentRequest(\d+)/update'>
                  <HelpUpdate />
                 </Route>
                <Route exact path="/help">
                  <HelpRequestsList />
                </Route>
                <Route exact path="/help/new">
                  <HelpForm />
                </Route>
                <Route exact path="/help/:currentRequest(\d+)">
                  <HelpDetails />
                </Route>
              </Switch>
              <Footer />
            </>
          } else {
            return <>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Redirect from="/login" to="/" />
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </>
          }
        }} />
    </Router>
    </>
  );
};
export default App

