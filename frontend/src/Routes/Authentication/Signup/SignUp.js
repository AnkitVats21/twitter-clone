import React, { Component } from "react";
import { message, notification } from "antd";
import {
  SmileOutlined,
  FrownOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import SignupForm from "./SignupForm/SignupForm";
import ServerService from "../../../services/ServerService";
import AuthScreen from "../../../components/AuthScreen/AuthScreen"
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
  state = {
    notificationIcon: null,
    notificationTitle: null,
    notificationContent: null,
    redirect: null,
  };

  componentDidMount() {
    localStorage.clear();
  }

  openNotification = (duration) => {
    notification.open({
      message: this.state.notificationTitle,
      description: this.state.notificationContent,
      icon: this.state.notificationIcon,
      duration: duration,
    });
  };

  onFinish = (userData) => {
    let key = "updatable";

    //loading msg
    // message.loading({ content: "Action in progress...", key });

    const registerData = {
      password: userData.password,
      email: userData.email,
    };

    console.log(registerData);

    ServerService.SignUp(registerData)
      .then((res) => {
        console.log(res);
        //to stop the loading
        localStorage.clear();
        if (res.status != 200) {
          //if signup is successful
          localStorage.setItem("accessToken", res.data.data.access);
          localStorage.setItem("refreshToken", res.data.data.refresh);
          localStorage.setItem("email", JSON.stringify(res.data.data.email));
          localStorage.setItem("isVerified", JSON.stringify(res.data.data.is_verified));
          this.setState(
            {
              notificationIcon: <SmileOutlined style={{ color: "#108ee9" }} />,
              notificationTitle: "Signup successful!",
              notificationContent:
                "Thanks! your account has been successfully created. A confirmation link has been sent on your email.",
              redirect: true,
            },
            () => {
              this.openNotification(4);
            }
          );

        }
      })
      .catch((err) => {
        //to stop the loading
        console.log(err.response.data);
        // message.error({ content: "User with given eamil already exists.", duration: 2 });
        const error = { ...err };
        console.log(error);

        if (error.response && error.response.status === 400) {
          //if email id already exists in database
          this.setState(
            {
              notificationIcon: <FrownOutlined style={{ color: "red" }} />,
              notificationTitle: "User already exists!",
              notificationContent:
                "The Email you entered is already linked to an account! Please proceed to Login page.",
            },
            () => {
              this.openNotification(6);
            }
          );
        } else {
          // any other error
          this.setState(
            {
              notificationIcon: (
                <ExclamationCircleOutlined style={{ color: "red" }} />
              ),
              notificationTitle: "Something went wrong!",
              notificationContent:
                "We are unable to process your request right now! Please try again after sometime.",
            },
            () => {
              this.openNotification(5);
            }
          );
        }
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />
    }
    return (
      <>
        <AuthScreen form={<SignupForm onFinish={this.onFinish} />} />
      </>
    );
  }
}

export default SignUp;
