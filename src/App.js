import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import {NavBar} from './components/nav/NavBar';
import {Footer} from './components/nav/Footer';
import {MCClassics} from './components/MCClassics';
import {Login} from './components/auth/Login'
import {Register} from './components/auth/Register'
import {ProjectsForm} from './components/projects/ProjectsForm'
import {ProjectsList} from './components/projects/ProjectsList'
import {ProjectsUpdate} from './components/projects/ProjectsUpdate'
import {ProjectsUser} from './components/projects/ProjectsUser'
import {Profile} from './components/profile/Profile'

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
                <Route exact path="/projects/usersprojects">
                  <ProjectsUser />
                </Route>
                <Route exact path="/projects/new">
                  <ProjectsForm />
                </Route>
                <Route exact path="/profiles/currentuser">
                  <Profile />
                </Route>
                {/* <Route exact path="/events">
                <EventsList />
              </Route>
              <Route exact path=/events/usersevents>
              <EventsUser />
              </Route>
              <Route exact path=/help/usersrequests>
              <HelpUser />
              </Route>
              <Route exact path="/help">
                <HelpList />
              </Route> */}
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

