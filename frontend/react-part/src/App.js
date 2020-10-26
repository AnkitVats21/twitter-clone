import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Routes/Home/Home';
import LogIn from './components/Routes/Authentication/Login/Login';
import SignUp from './components/Routes/Authentication/Signup/Signup'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/log-in' component={LogIn} />
    <Route path='/sign-up' component={SignUp} />

    </Switch>
    </Router>

  );
}

export default App;
