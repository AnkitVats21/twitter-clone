import React from 'react'
import Blogcards from './Cards/Blogcards';
import './Widgets.css';
import Postcards from './Cards/Postcards';

function widgets() {

    const cardData = [
        {
            username: "usernam1",
            summary: "lorem ipsum sjdas",
            avatar: "https://64.media.tumblr.com/5f87683ebac5f6783e5ecbbc3b4e06cc/61d1fc6d5ac02707-a7/s64x64u_c1/6f12fe9f3ef05861a16116927bed1cf309ca346d.jpg"
        },
        {
            username: "usernam2",
            summary: "lorem ipdsasum sjdas",
            avatar: "https://64.media.tumblr.com/5f87683ebac5f6783e5ecbbc3b4e06cc/61d1fc6d5ac02707-a7/s64x64u_c1/6f12fe9f3ef05861a16116927bed1cf309ca346d.jpg"
        },
        {
            username: "Amit Mishra",
            summary: "lorem ipsum sjdas",
            avatar: "https://64.media.tumblr.com/5f87683ebac5f6783e5ecbbc3b4e06cc/61d1fc6d5ac02707-a7/s64x64u_c1/6f12fe9f3ef05861a16116927bed1cf309ca346d.jpg"
        },
        {
            username: "Shalini Mishra",
            summary: "lorem ipsum sjdas",
            avatar: "https://64.media.tumblr.com/5f87683ebac5f6783e5ecbbc3b4e06cc/61d1fc6d5ac02707-a7/s64x64u_c1/6f12fe9f3ef05861a16116927bed1cf309ca346d.jpg"
        },
    ]
    const postData = {
        liked: true,
        // text: "Hoy me hubiese gustado recibir un mensaje tuyo diciéndome que te has dado cuenta que si quieres tenerme en tu vida. No escribiste, pero yo tampoco te escribí. En el fondo se que buscarte es egoísta, y lo sé porque más allá de mis sentimientos, también existen tus sentimientos, y justamente por quererte, respeto tu tranquilidad sin mi.",
        image: "https://64.media.tumblr.com/06ac109f2ee77f365c76e558e8905151/9ae1b7d4be7050bd-32/s400x600/5e90a6b215d28a2470c63dea1c419fdc41d171b5.jpg"
    }

    return (
        <>
            <div className="header">
                <h1>Checkout these blogs</h1>
                {cardData.map((data, index) => {
                    return (
                        <Blogcards data={data} />
                    )
                })}
                <a href="">Explore all of Talkpiper</a>
            </div>
            <div className="header">
                <h1>Radar</h1>
                <Postcards postData={postData} />
            </div>

        </>
    )
}

export default widgets
