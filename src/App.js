import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Switch } from 'react-router-dom'

import routes from "./routes"
import withTracker from "./withTracker"

import { connect } from "react-redux"
import { setCurrentUser } from "./redux/user/user.actions"
import { auth, getDataFromRef } from "./firebase"

import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/shards-dashboards.1.1.0.min.css"

import LoginPage from './views/LoginPage'
import ErrorPage from './views/ErrorPage'

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const userToSet = await verify(userAuth)
      setCurrentUser(userToSet)
      if (!userToSet) auth.signOut()
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  if (this.props.currentUser) {
                    return (
                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
                    )
                  } else {
                    return <LoginPage />
                  }
                })}
              />
            )
          })}
          <Route
            key={routes.length}
            children={<ErrorPage code="404" message="The requested page was not found on our servers."/>}
          />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

const verify = async userAuthObj => {
  if (!userAuthObj) return null
  if (!userAuthObj.emailVerified) return null
  let allUsers = await getDataFromRef("Users")
  let shouldAllow = Object.values(allUsers).find(e => userAuthObj.email === e.email && e.dashboardAccess);
  if (!shouldAllow) return null;

  return {
    id: userAuthObj.uid,
    email: userAuthObj.email,
    displayName: userAuthObj.displayName,
    photoURL: userAuthObj.photoURL,
    phoneNumber: userAuthObj.phoneNumber
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
