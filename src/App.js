import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Post from "./components/Post";
import Posts from "./components/Posts";
import User from "./components/User";
import { ThemeProvider } from "./contexts/theme";
import "./index.css";
import HashLoader from "react-spinners/HashLoader";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const state = { theme, toggleTheme };

  return (
    <Router>
      <ThemeProvider value={state}>
        <div className={theme}>
          <div className="container">
            <Nav />

            <React.Suspense fallback={<HashLoader />}>
              <Switch>
                <Route exact path="/" render={() => <Posts type="top" />} />
                <Route path="/new" render={() => <Posts type="new" />} />
                <Route path="/post" component={Post} />
                <Route path="/user" component={User} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
