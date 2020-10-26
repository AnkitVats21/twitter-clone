import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './components/Navbar/Navbar'
import Home from './components/Routes/Home/Home';
import LogIn from './components/Routes/Login/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/log-in' component={LogIn} />

    </Switch>
    </Router>

  );
}

export default App;
