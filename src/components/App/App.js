import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

// Import all custom components for our App
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Businesses from '../Businesses/Businesses'
import Business from '../Business/Business'
import BusinessCreate from '../BusinessCreate/BusinessCreate'
import BusinessEdit from '../BusinessEdit/BusinessEdit'
import Projects from '../Projects/Projects'
import Project from '../Project/Project'
import ProjectCreate from '../ProjectCreate/ProjectCreate'
import ProjectEdit from '../ProjectEdit/ProjectEdit'
import ProjectShow from '../ProjectShow/ProjectShow'
import Home from '../Home/Home'

// We want to have state at the highest level possible in our app
// So `App` is a class component
class App extends Component {
  constructor () {
    super()

    // Setup state: hold a reference to the user and all message alerts
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  // This method is passed as a prop to `SignIn` and `SignUp`
  // It is used to set the user on the state after successful sign in
  // Sign in happens automatically after as successful sign up
  // We declare this in `App` so it modifies the state of `App` not a child component
  setUser = user => this.setState({ user })

  // This method is passed as a prop to `SignOut` or any component that needs to clear the user
  // It sets the `user` to `null`
  clearUser = () => this.setState({ user: null })

  // This method is passed as a prop to almost every component (any component that wants to display messages)
  // Accepts a `heading`, `message`, and `variant`
  // It sets the state of the `msgAlerts` array to add in the new message it receives
  msgAlert = ({ heading, message, variant }) => {
    // The spread (...) operator allows us to create a copy of the current `msgAlerts` and add a new one to that array
    // This then sets the state with the updated array
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  // This renders our app!
  render () {
    // Destructure from the state
    const { msgAlerts, user } = this.state

    // We have to return JSX!
    // We pass the user to the `Header` to have it display the correct links
    // Map over the `msgAlerts` array and display one `AutoDismissAlert` for each object
    // For routing, we have `Route` and `AuthenticatedRoute`:
    // Routes can be used for regular routing!
    // AuthenticatedRoute can be used if we only want to allow access to a route after a user has signed in
    // We MUST pass `user` as a prop to the `AuthenticatedRoute`s we use
    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={props => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/businesses' render={() => (
            <Businesses msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/businesses/:id' render={({ match }) => (
            <Business match={match} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/business-create' render={() => (
            <BusinessCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/businesses/:id/edit' render={({ match }) => (
            <BusinessEdit match={match} msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/projects' render={() => (
            <Projects msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact user={user} path='/projects/:id' render={({ match }) => (
            <Project match={match} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/project-create' render={() => (
            <ProjectCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/projects/:id/edit' render={({ match }) => (
            <ProjectEdit match={match} msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/view' render={() => (
            <ProjectShow msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/' render={() => (
            <Home msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
