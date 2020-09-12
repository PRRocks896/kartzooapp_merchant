import React from "react";
import "./App.css";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Main from "./routes/routes";
import Login from "./pages/login/login";
import ResetPassword from "./pages/resetpassword/resetpassword";
// import ProtectedRoute from 'react-protected-route-component'

class App extends React.Component {
  render() {
    const PrivateRoute = ({ component: Component, ...rest }: any) => (
      <Route
        {...rest}
        render={(props) =>
          // console.log(Component)
          localStorage.getItem("token") !== null ? (
            // console.log("msg")
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props: any) =>
              localStorage.getItem("token") !== null ? (
                <Redirect to="/" />
              ) : (
                <Login {...props} />
              )
            }
          />
            <Route exact path='/resetpassword/:guid' render={(props: any) =>  localStorage.getItem("token") !== null ? (
                <Redirect to="/" />
              ) : (
                <ResetPassword {...props} />
              )
            }
            />
          <PrivateRoute path="/" component={Main} />
        </Switch>
      </Router>
    );
  }
}

export default App;
