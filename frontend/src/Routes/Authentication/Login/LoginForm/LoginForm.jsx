import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Input, Button } from "antd";
import "./LoginForm.css";

function LoginForm(props) {

    const onFinish = (values) => {
        const userData = {
            email: values.email,
            password: values.password
        }
        props.submitHandeler(userData);
    }

    return (
        <>
            <div className="loginForm">
                <div className="loginHeader">
                    <div className="header">
                        Talkpiper
                    </div>
                    <div className="headline">
                        Welcome back!
                    </div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                },
                                { required: true, message: "Please input your E-Mail!" },
                            ]}
                        >
                            <Input
                                placeholder="E-Mail"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!"
                                },
                                // {
                                //     pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                //     message: "Minimum eight characters, at least one letter and one number required"
                                // }
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                htmlType="submit"
                            >
                                Login
                            </Button>
                        </Form.Item>

                        <h6 className="formFooter">
                            Don't have an acccount?<NavLink to="/">Create one</NavLink>
                        </h6>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
