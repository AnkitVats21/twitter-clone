import React from 'react'
import './Feed.css'
import Post from './Post';
import Widget from './Widgets';

function Feed() {
  const dummyData = [
    {
      liked: true,
      text: "Hoy me hubiese gustado recibir un mensaje tuyo diciéndome que te has dado cuenta que si quieres tenerme en tu vida. No escribiste, pero yo tampoco te escribí. En el fondo se que buscarte es egoísta, y lo sé porque más allá de mis sentimientos, también existen tus sentimientos, y justamente por quererte, respeto tu tranquilidad sin mi.",
      image: "https://source.unsplash.com/user/erondu/600x500"
    },
    {
      liked: true,
      text: "Hoy me hubiese gustado recibir un mensaje tuyo diciéndome que te has dado cuenta que si quieres tenerme en tu vida. No escribiste, pero yo tampoco te escribí. En el fondo se que buscarte es egoísta, y lo sé porque más allá de mis sentimientos, también existen tus sentimientos, y justamente por quererte, respeto tu tranquilidad sin mi.",
      image: "https://source.unsplash.com/user/erondu/600x400"
    },
    {
      liked: true,
      text: "Hoy me hubiese gustado recibir un mensaje tuyo diciéndome que te has dado cuenta que si quieres tenerme en tu vida. No escribiste, pero yo tampoco te escribí. En el fondo se que buscarte es egoísta, y lo sé porque más allá de mis sentimientos, también existen tus sentimientos, y justamente por quererte, respeto tu tranquilidad sin mi.",
      image: "https://source.unsplash.com/user/erondu/600x300"
    },
    {
      liked: true,
      text: "Hoy me hubiese gustado recibir un mensaje tuyo diciéndome que te has dado cuenta que si quieres tenerme en tu vida. No escribiste, pero yo tampoco te escribí. En el fondo se que buscarte es egoísta, y lo sé porque más allá de mis sentimientos, también existen tus sentimientos, y justamente por quererte, respeto tu tranquilidad sin mi.",
      image: "https://source.unsplash.com/user/erondu/600x400"
    },
    {
      liked: true,
      text: "Hoy me hubiese gustado recibir un mensaje tuyo diciéndome que te has dado cuenta que si quieres tenerme en tu vida. No escribiste, pero yo tampoco te escribí. En el fondo se que buscarte es egoísta, y lo sé porque más allá de mis sentimientos, también existen tus sentimientos, y justamente por quererte, respeto tu tranquilidad sin mi.",
      image: "https://source.unsplash.com/user/erondu/600x400"
    },
    {
      liked: true,
      text: "Hoy me hubiese gustado recibir un mensaje tuyo diciéndome que te has dado cuenta que si quieres tenerme en tu vida. No escribiste, pero yo tampoco te escribí. En el fondo se que buscarte es egoísta, y lo sé porque más allá de mis sentimientos, también existen tus sentimientos, y justamente por quererte, respeto tu tranquilidad sin mi.",
      image: "https://source.unsplash.com/user/erondu/600x400"
    },

  ]
  return (
    <div className="feed">
      <div className="post">
        {
          dummyData.map((post, index) => {
            return (
              <Post
                key={index}
                data={post}
              />
            )
          })
        }
      </div>
      <div className="extra">
        <Widget />
      </div>
    </div>
  )
}

export default Feed
