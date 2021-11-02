import React from 'react';
import './Blogcards.css';

function blogcards(props) {
    return (
        <ul className="blogcards">
            <li>
                <div className="item">
                    <div className="avatar">
                        <div className="img">
                            <img src={props.data.avatar} alt="" />
                        </div>
                        <div className="handle">
                            <div className="username">
                                <span>{props.data.username}</span>
                            </div>
                            <div className="name">
                                <span>{props.data.summary}</span>
                            </div>
                        </div>
                    </div>
                    <div className="follow">
                        <span>Follow</span>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default blogcards
