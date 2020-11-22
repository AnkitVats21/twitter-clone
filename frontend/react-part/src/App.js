import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Home from './components/Routes/Home/Home';
import Messages from './components/Routes/Messages/Messages';
import Explore from './components/Routes/Explore/Explore';
import Bookmarks from './components/Routes/Bookmarks/Bookmarks';
import Notifications from './components/Routes/Notifications/Notifications';
import Search from './components/Routes/Search/Search';
import Comments from './components/Routes/Comments/Comments';
import Profile from './components/Routes/Profile/Profile';
import EditProfile from './components/Routes/Profile/EditProfile';
import UserProfile from './components/Routes/UserProfile/UserProfile';
import Followers from './components/Routes/Profile/Followers';
import Following from './components/Routes/Profile/Following';
import LogIn from './components/Routes/Authentication/Login/Login';
import ForgotPassword from './components/Routes/Authentication/ForgotPassword/ForgotPassword';
import PasswordResetOtp from './components/Routes/Authentication/PasswordResetOtp/PasswordResetOtp';
import PasswordChange from './components/Routes/Authentication/PasswordChange/PasswordChange';
import SignUp from './components/Routes/Authentication/Signup/Signup'
import OTP from './components/Routes/Authentication/OTP/OTP'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'antd/dist/antd.css';
import Protected from './services/Protected'

function App() {
  return (
    <Router>
    <Switch>
    <Protected path='/' exact component={Home} />
    <Protected path='/messages' component={Messages} />
    <Protected path='/search' component={Search} />
    <Protected path='/comments' component={Comments} />
    <Protected path='/explore' component={Explore} />
    <Protected path='/bookmarks' component={Bookmarks} />
    <Protected path='/profile' component={Profile} />
    <Protected path='/edit-profile' component={EditProfile} />
    <Protected path='/user-profile' component={UserProfile} />
    <Protected path='/followers' component={Followers} />
    <Protected path='/following' component={Following} />
    <Protected path='/notifications' component={Notifications} />
    <Route path='/log-in' component={LogIn} />
    <Route path='/forgot-password' component={ForgotPassword} />
    <Route path='/password-reset-otp' component={PasswordResetOtp} />
    <Route path='/change-password' component={PasswordChange} />
    <Route path='/sign-up' component={SignUp} />
    <Route path='/otp' component={OTP} />

    </Switch>
    <NotificationContainer />
    </Router>

  );
}

export default App;
