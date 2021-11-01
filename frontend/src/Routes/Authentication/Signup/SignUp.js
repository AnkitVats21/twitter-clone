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

class SignUp extends Component {
  state = {
    notificationIcon: null,
    notificationTitle: null,
    notificationContent: null,
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
    message.loading({ content: "Action in progress...", key });

    const registerData = {
      institutionName: userData.collegeName,
      contactNumber: userData.phone,
      password: userData.password,
      email: userData.email,
    };

    console.log(registerData);

    ServerService.RegisterInstitution(registerData)
      .then((res) => {
        console.log(res);
        //to stop the loading
        message.success({ content: "Action completed!", key, duration: 2 });
        if (res.status === 200) {
          //if signup is successful
          this.setState(
            {
              notificationIcon: <SmileOutlined style={{ color: "#108ee9" }} />,
              notificationTitle: "Signup successful!",
              notificationContent:
                "Thanks! your account has been successfully created. Please wait for it to be verified by our Admin.",
            },
            () => {
              this.openNotification(4.5);
            }
          );
        }
      })
      .catch((err) => {
        //to stop the loading
        message.error({ content: "Something went wrong!", key, duration: 2 });
        const error = { ...err };
        console.log(error);

        if (error.response && error.response.status === 409) {
          //if email id already exists in database
          this.setState(
            {
              notificationIcon: <FrownOutlined style={{ color: "red" }} />,
              notificationTitle: "User already exists!",
              notificationContent:
                "The Email you entered is already linked to an account! Please proceed to Signin page.",
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
    return (
      <>
        <AuthScreen form={<SignupForm />} onFinish={this.onFinish} />
      </>
    );
  }
}

export default SignUp;
