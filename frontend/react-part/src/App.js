import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Routes/Home/Home';
import Messages from './components/Routes/Messages/Messages';
import Explore from './components/Routes/Explore/Explore';
import Bookmarks from './components/Routes/Bookmarks/Bookmarks';
import Notifications from './components/Routes/Notifications/Notifications';
import Search from './components/Routes/Search/Search';
import Comments from './components/Routes/Comments/Comments';
import Profile from './components/Routes/Profile/Profile';
import Followers from './components/Routes/Profile/Followers';
import Following from './components/Routes/Profile/Following';
import LogIn from './components/Routes/Authentication/Login/Login';
import ForgotPassword from './components/Routes/Authentication/ForgotPassword/ForgotPassword';
import PasswordResetOtp from './components/Routes/Authentication/PasswordResetOtp/PasswordResetOtp';
import PasswordChange from './components/Routes/Authentication/PasswordChange/PasswordChange';
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
    <Route path='/comments' component={Comments} />
    <Route path='/explore' component={Explore} />
    <Route path='/bookmarks' component={Bookmarks} />
    <Route path='/profile' component={Profile} />
    <Route path='/followers' component={Followers} />
    <Route path='/following' component={Following} />
    <Route path='/notifications' component={Notifications} />
    <Route path='/log-in' component={LogIn} />
    <Route path='/forgot-password' component={ForgotPassword} />
    <Route path='/password-reset-otp' component={PasswordResetOtp} />
    <Route path='/change-password' component={PasswordChange} />
    <Route path='/sign-up' component={SignUp} />
    <Route path='/otp' component={OTP} />

    </Switch>
    </Router>

  );
}

export default App;
