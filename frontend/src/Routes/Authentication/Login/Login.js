import React from 'react';
import AuthScreen from '../../../components/AuthScreen/AuthScreen';
import LoginForm from './LoginForm/LoginForm';
import ServerService from '../../../services/ServerService'
import { Redirect } from 'react-router';
import { message } from 'antd';


export default function Loggingin() {

  // localStorage.clear();

  const [success, setSuccess] = React.useState(false);

  const onFinish = (values) => {
    localStorage.clear();
    ServerService.Login(values).then(res => {
      localStorage.setItem("accessToken", res.data.data.access);
      localStorage.setItem("refreshToken", res.data.data.refresh);
      localStorage.setItem("email", JSON.stringify(res.data.data.email));
      localStorage.setItem("isVerified", JSON.stringify(res.data.data.is_verified));
      setSuccess(true);
      message.success({ content: "Logged in Successfully!", duration: 2 });
    }).catch(err => {
      message.error({ content: err.response.data.meta.msg, duration: 2 });
    });
  };

  return success ? (<Redirect to="/dashboard" />) : (
    <AuthScreen
      form={<LoginForm submitHandeler={onFinish} />}
    />
  )

}