import React from 'react';
import AuthScreen from '../../../components/AuthScreen/AuthScreen';
import LoginForm from './LoginForm/LoginForm';
export default function Loggingin() {
  return (
    <AuthScreen
      form={<LoginForm />}
    />
  )

}