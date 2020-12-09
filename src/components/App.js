import React from 'react';
import Signup from "./login/Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./login/Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./login/ForgotPassword"
import UpdateProfile from "./login/UpdateProfile"

function App() {
  return (
    <div className="App">
    <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
