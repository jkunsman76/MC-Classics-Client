import React, { useState } from 'react';
import NavBar from './components/nav/NavBar';
import Footer from './components/Footer';
import './App.css';
import MCClassics from './components/MCClassics';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login'
import Register from './components/auth/Register'







function App() {
  return (
    <>
      <Router>
        <Route render={() => {
          if (localStorage.getItem("lu_token")) {
            return <>
              <Route>
                <NavBar />
                <MCClassics />
                <Footer />
              </Route>
            </>
          } else {
            return <>
              <Route>
                <Login />
              </Route>
            </>
          }
        }} />
      </Router>
    </>
  );
};
export default App




// function App() {
  // const [token, setToken] = useState();

  // if(!token) {
  //   return (
  //     <Route>
  //   <Login setToken={setToken} />
  //   </Route>

  //   )
  // }
  //   return (
  //     <>
  //       <Router>
  //               <Route>
  //                 {/* <NavBar /> */}
  //                 <Switch>
  //                   <Route path='/' exact component={MCClassics} />
  //                   <Route path='/api/login' exact component={Login} />
  //                   <Route path='/api/register' exact component={Register} />
  //                 </Switch>
  //                 {/* <Footer /> */}
  //               </Route>
  //       </Router>
  //     </>
  //   );
  // }

  // export default App
