import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Input, Button } from "antd";
import "./SignUpForm.css";

function SignupForm(props) {

    const onFinish = (values) => {
        const userData = {
            email: values.email,
            password: values.password
        }
        props.submitHandler(userData);
    }

    return (
        <>
            <div className="signUpForm">
                <div className="signUpHeader">
                    <div className="header">
                        Talkpiper
                    </div>
                    <div className="headline">
                        Make stuff, look at stuff, talk about stuff, find your people.
                    </div>
                    <Form
                        name="normal_login"
                        className="signup-form"
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

                        <Form.Item
                            name="password2"
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your Password!"
                                },
                                // {
                                //     pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                //     message: "Minimum eight characters, at least one letter and one number required"
                                // }
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button>
                                Create Account
                            </Button>
                        </Form.Item>

                        <h6 className="formFooter">
                            Already have an acccount?<NavLink to="/login">Login</NavLink>
                        </h6>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default SignupForm;
