import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/lib/notifications.css';
// import { NotificationContainer, NotificationManager } from 'react-notifications';
// import Home from './Routes/Home/Home';
// import Messages from './Routes/Messages/Messages';
// import Explore from './Routes/Explore/Explore';
// import Bookmarks from './Routes/Bookmarks/Bookmarks';
// import Notifications from './Routes/Notifications/Notifications';
// import Search from './Routes/Search/Search';
// import Comments from './Routes/Comments/Comments';
// import Profile from './Routes/Profile/Profile';
// import EditProfile from './Routes/Profile/EditProfile';
// import UserProfile from './Routes/UserProfile/UserProfile';
// import Followers from './Routes/Profile/Followers';
// import Following from './Routes/Profile/Following';
import LogIn from './Routes/Authentication/Login/Login';
// import ForgotPassword from './Routes/Authentication/ForgotPassword/ForgotPassword';
// import PasswordResetOtp from './Routes/Authentication/PasswordResetOtp/PasswordResetOtp';
// import PasswordChange from './Routes/Authentication/PasswordChange/PasswordChange';
import SignUp from './Routes/Authentication/Signup/SignUp'
// import OTP from './Routes/Authentication/OTP/OTP'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import PrivateChats from './Routes/Messages/PrivateChats'
// import LikedUsers from './Routes/LikedUsers/LikedUsers'

import 'antd/dist/antd.css';
import Protected from './services/Protected'

function App() {
  return (
    <Router>

      <Switch>
        {/* <Protected path='/' exact component={Home} />
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
        <Protected path='/notifications' component={Notifications} /> */}
        <Route path='/login' component={LogIn} />
        {/* <Route path='/forgot-password' component={ForgotPassword} /> */}
        {/* <Route path='/password-reset-otp' component={PasswordResetOtp} /> */}
        {/* <Route path='/change-password' component={PasswordChange} /> */}
        <Route path="/" exact component={SignUp} />
        {/* <Route path='/otp' component={OTP} />
        <Route path='/user-messages' component={PrivateChats} />
        <Route path='/liked-by' component={LikedUsers} /> */}
      </Switch>
      {/* <NotificationContainer /> */}
    </Router>

  );
}

export default App;
