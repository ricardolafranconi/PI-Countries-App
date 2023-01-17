import './App.css';
import React from 'react';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import CountryDetail from './components/CountryDetail';
import CreateActivity from './components/CreateActivity';


function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path = '/' component={LandingPage}></Route>
        <Route exact path = '/countries' component={Home}></Route>
        <Route exact path = '/countries/:id' component={CountryDetail}></Route>
        <Route exact path = '/activities' component={CreateActivity}></Route>
        
      </Switch>

    </div>
    
    </BrowserRouter>
  );
}

export default App;
