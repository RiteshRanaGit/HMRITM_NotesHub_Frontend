import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import { logoutUser } from './actions/authActions';
import { clearCurrentClassroom } from './actions/classroomAction';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';


//import components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AdminLogin from './components/auth/AdminLogin';
import Classroom from './components/classroom/Classroom';
import Dashboard from './components/dashboard/Dashboard';
import CreateClassroom from './components/create-classroom/CreateClassroom';
import CreateSubject from './components/create-subject/CreateSubject';
import CreateClassNotice from './components/create-class-notice/CreateClassNotice';
import CreateSubjectNotice from './components/create-subject-notice/CreateSubjectNotice';
import UploadNotes from './components/upload-notes/UploadNotes';
import UploadEvents from './components/upload-events/UploadEvents';
import RegisterAdmin from './components/auth/RegisterAdmin';





import './App.css';


//import { clearCurrentClassroom } from './actions/classroomAction';

// Check for token

if(localStorage.jwtToken){
  // set the off token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and Authenticated
  store.dispatch(setCurrentUser(decoded));

  //check fo rexpied token
  const currentTime = Date.now()/ 1000;
  if(decoded.exp < currentTime){
    // Logout user
    store.dispatch(logoutUser());
    // clear current classrom
    store.dispatch(clearCurrentClassroom());
    // Redirect to Login 
    window.location.href = '/';
  }
}



function App() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar/>
          {/* <h1>hello front end is start </h1> */}
          <Route exact path="/" component={Landing}/>
          <div className="container">
            <Route exact path="/adminlogin" component={AdminLogin}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Switch>
              <PrivateRoute exact path="/classroom" component={Classroom}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-classroom" component={CreateClassroom}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-subject" component={CreateSubject}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-class-notice" component={CreateClassNotice}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-subject-notice" component={CreateSubjectNotice}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/upload-notes" component={UploadNotes}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/upload-events" component={UploadEvents}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/register-admin" component={RegisterAdmin}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
  ); 
}

export default App;
