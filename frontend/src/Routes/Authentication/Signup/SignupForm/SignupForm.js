import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Input, Button } from "antd";
import "./SignUpForm.css";

function SignupForm(props) {

    const submitHandler = (values) => {
        if (values.email && values.password && values.confirm) {

            const userData = {
                email: values.email,
                password: values.password
            }
            props.onFinish(userData);
        }
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
                        onFinish={submitHandler}
                    // initialValues={{ remember: true }}
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
                            // label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        // hasFeedback
                        >
                            <Input
                                type="password"
                                placeholder="Password"

                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                htmlType="submit"
                            >
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
