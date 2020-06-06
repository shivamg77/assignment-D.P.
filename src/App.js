import React from 'react';
import List from './List'
import Post from './Post'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={List}/>
        <Route path="/user-post/:id" component={Post} />
      </Switch>
    </Router>
  );
}

export default App;
