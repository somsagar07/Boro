import './App.css';
import Mapp from './map';
import Login from './Login';
import Dashboard from './Dashboard';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default function App() {
  return (
    <Router>
          <Route exact path='/' component={Login}/>
          <Route exact path='/map' component={Mapp}/>
          <Route exact path='/dash' component={Dashboard}></Route>
    </Router>
  );
}