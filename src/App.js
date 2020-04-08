import React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { Switch } from 'react-router-dom'

import './App.scss'

import { adminRoutes, routes } from "./routes";
import withTracker from "./withTracker"

import { connect } from "react-redux"

import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/shards-dashboards.1.1.0.min.css"

import LoginPage from './pages/LoginPage'
import ErrorPage from './pages/ErrorPage'
import { checkUserSession } from "./redux/user/user.actions"
import { verifyLoginStatus } from "./firebase"

class App extends React.Component {

  componentDidMount() {
    this.props.checkUserSession()
  }

  render() {
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props =>
                this.props.currentUser && verifyLoginStatus() ? (

                    <route.component {...props} />
                ) : (
                  <LoginPage />
                )
              )}
            />
          ))}

          {adminRoutes.map((route, index) => (
            <Route
              key={index}
              path={"/admin" + route.path}
              exact={route.exact}
              component={withTracker(props =>
                this.props.currentUser &&
                this.props.currentUser.dashboardAccess &&
                verifyLoginStatus() ? (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                ) : this.props.currentUser && verifyLoginStatus ? (
                  <Redirect to="/" />
                ) : (
                  <LoginPage />
                )
              )}
            />
          ))}
          <Route
            key={routes.length}
            children={
              <ErrorPage
                code="404"
                message="The requested page was not found on our servers."
              />
            }
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
