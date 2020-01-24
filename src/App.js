import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from './contexts/theme'
import Loading from './components/Loading'
import Nav from './components/Nav'
import './App.css';
import Post from './components/Post'
import User from './components/User'
import Posts from './components/Posts'

function App() {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(
      theme === 'light' ? 'dark' : 'light'
    )
  }

  const state = {theme, toggleTheme}

  return (
    <Router>
      <ThemeProvider value={state}>
        <div className={theme}>
          <div className='container'>
            <Nav/>

            <React.Suspense fallback={<Loading/>}>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => <Posts type='top'/>}
                />
                <Route
                  path='/new'
                  render={() => <Posts type='new'/>}
                />
                <Route path='/post' component={Post}/>
                <Route path='/user' component={User}/>
                <Route render={() => <h1>404</h1>}/>
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App;
