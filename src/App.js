import React from 'react'
import SignUp from './components/auth/SignUp';
import { AuthProvider } from './contexts/AuthContext.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './components/auth/Dashboard';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'
import ForgotPassword from './components/auth/ForgotPassword';
import Todo from './components/Todo/Todo';
import UpdateProfile from './components/auth/UpdateProfile';
import Home from './components/pages/Home';
import Track from "./components/track/Track";
import { motion, AnimatePresence } from "framer-motion"

function App() {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  }
  return (
    <Router>
      <AuthProvider>
        <AnimatePresence>
          <Switch>
            {/* <PrivateRoute exact path='/' component={Home} /> */}
            <PrivateRoute path='/user' component={Dashboard} />
            <PrivateRoute path='/update-profile' component={UpdateProfile} />
            <PrivateRoute path='/todo' component={Todo} />
            <PrivateRoute path='/track' component={Track} />
            <Route exact path='/' component={Home} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <Route path='/forgot-password' component={ForgotPassword} />
          </Switch>
        </AnimatePresence>
      </AuthProvider>
    </Router>
  );
}

export default App;
