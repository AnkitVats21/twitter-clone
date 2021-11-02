import React from 'react'
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Postcards.css';

function Postcards(props) {
    const postData = props.postData;
    console.log(postData);
    return (
        <div className="postcards">
            <header>
                <div className="username">
                    <div className="name">
                        <a href="">escribir-para-no-llorar</a>
                    </div>
                    <div className="follow">
                        <a href="">Follow</a>
                    </div>
                </div>
                <div className="more">
                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                </div>
            </header>
            <div className="content">
                <div className="text">
                    {postData.text}
                </div>
                <div className="image">
                    <img src={postData.image} alt="" />
                </div>
            </div>
            <footer>
                <div className="likes">
                    10000 likes
                </div>
                <div className="actions">
                    <div className="like">
                        <i class="fas fa-like"></i>
                        <LikeOutlined style={{ fontSize: '24px', color: "blue" }} />

                    </div>
                    <div className="comment">
                        <CommentOutlined style={{ fontSize: '24px' }} />
                    </div>
                    <div className="share">
                        <ShareAltOutlined style={{ fontSize: '24px' }} />
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Postcards
