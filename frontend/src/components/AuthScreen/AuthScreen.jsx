import React from 'react';
import Logo from "../../assets/icons/logo.svg";
import "./AuthScreen.css";

export default function AuthScreen(props) {
    return (
        <div className='bg'>
            <div className="welcome-box">
                <div className="logo">
                    <img src={Logo} alt="logo" width={"150rem"} height={"150rem"} />
                    <div className="brand-name">
                        <h1>Talkpiper</h1>
                    </div>
                </div>
            </div>
            {props.form}
        </div>
    )
}
