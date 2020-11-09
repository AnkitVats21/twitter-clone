import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Routes/Home/Home';
import Messages from './components/Routes/Messages/Messages';
import Explore from './components/Routes/Explore/Explore';
import Bookmarks from './components/Routes/Bookmarks/Bookmarks';
import Notifications from './components/Routes/Notifications/Notifications';
import Search from './components/Routes/Search/Search';
import Profile from './components/Routes/Profile/Profile';
import LogIn from './components/Routes/Authentication/Login/Login';
import SignUp from './components/Routes/Authentication/Signup/Signup'
import OTP from './components/Routes/Authentication/OTP/OTP'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/messages' component={Messages} />
    <Route path='/search' component={Search} />
    <Route path='/explore' component={Explore} />
    <Route path='/bookmarks' component={Bookmarks} />
    <Route path='/profile' component={Profile} />
    <Route path='/notifications' component={Notifications} />
    <Route path='/log-in' component={LogIn} />
    <Route path='/sign-up' component={SignUp} />
    <Route path='/otp' component={OTP} />

    </Switch>
    </Router>

  );
}

export default App;
