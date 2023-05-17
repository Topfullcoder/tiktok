import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

import "./App.css";
import Tag from "./components/Tag";
import User from "./components/User";
import Movie from "./components/Movie";
import Link from "./components/Link";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">Admin Dashboard</h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/tag">
                Tag
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary" to="/movie"
              >
                Movie
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/user">
                User
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/link">
                Link
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/tag" component={Tag} />
          <Route path="/movie" component={Movie} />
          <Route path="/user" component={User} />
          <Route path="/link" component={Link} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
