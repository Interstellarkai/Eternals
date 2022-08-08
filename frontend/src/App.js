// this page is gonna have a navbar (link to the other components)
// and the user can switch between different routes
import React from "react";
import { Switch , Route, Link } from "react-router-dom"; // used to create different url routes 
import "bootstrap/dist/css/bootstrap.min.css"; // used to style 

import AddReview from "./components/add-review";
import Login from "./components/login";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";



// navbar from bootstrap documentation
function App() {
  // react hooks 
  // setUser is a setter used to update the user variable 
  const [user, setUser] = React.useState(null); // create a state variable, initial value set to null

  // Dummy system 
  // TO DO (Future improvements)
  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <button onClick={logout} className="nav-link" style={{ cursor: 'spointer' }}>
                Logout {user.name}
              </button>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
