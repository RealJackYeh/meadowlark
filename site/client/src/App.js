import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import logo from './img/logo.png';
import './App.css';

function Home() {
  return (
    <div>
      <h2>Welcome to Jack Yeh site</h2>
      <p>Check out our "<link to="/about">About</link>" page!</p>
    </div>
  )
}
function About() {
  return (<i>coming soon</i>)
}
function notFound() {
  return (<i>Not Found</i>)
}
function App() {

  return (
    <Router>
      <div className="container">
        <header>
          <h1>Jack Yeh page</h1>
          <img src={logo} alt="Jack Yeh Logo" />
          <link to="/">Home (SPA)</link>
          <a href="/">Home (reload)</a>
        </header>
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route component={notFound} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
