import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Switch } from 'react-router-dom'

import routes from "./routes"
import withTracker from "./withTracker"

import { connect } from "react-redux"

import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/shards-dashboards.1.1.0.min.css"

import LoginPage from './pages/LoginPage'
import ErrorPage from './pages/ErrorPage'
import { checkUserSession } from "./redux/user/user.actions"

class App extends React.Component {

  componentDidMount() {
    this.props.checkUserSession()
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
                component={withTracker(props => 
                  this.props.currentUser
                  ? <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  : <LoginPage />
                )}
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
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
