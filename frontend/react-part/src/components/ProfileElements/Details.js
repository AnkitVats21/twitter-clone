import React, { useState, useEffect } from "react";
import '../ProfileElements/ProfileElements.css'
import { Redirect, Link } from 'react-router-dom';
import Background from '../../assets/images/texting-1490691_1920.jpg'
import Post from '../Feed/Post'

function Details({propactive}) {


  return (
<>
<div className="feed__header">
<h2>Profile</h2>
</div>

<div className="profilewrap">{/*
<div className="imgbox">
<img src="https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/05/21/Pictures/_037138a2-9b47-11ea-a010-c71373fc244b.jpg" />
</div>
<div className="profiledetails">
  <h4>Username</h4>

</div>
</div> */}

<div className="coverimg" style={{  
backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")",
backgroundPosition: 'center',
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat'
}}>
<img className="profileimg" src={Background} />
</div>
  
<div className="profiledetails">
<h4 className="personname">Username</h4>
<h5 className="personusername">@PMOIndia</h5>
<p className="biotext">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut mattis nibh lorem. Tincidunt tellus ultricies viverra nunc, diam, at. Tincidunt fermentum in dignissim imperdiet euismod semper ac et. In arcu, fermentum quam diam, quisque massa nec.</p>

<div className="options">
<Link to="/profile" className="profilenums">
{propactive==="posts"? <div className="activeoption">
<h5 className="headingnums">23</h5>
<p className="nums">Posts</p>
</div>: <div>
<h5 className="headingnums">23</h5>
<p className="nums">Posts</p>
</div> }
</Link>

<Link to="/followers"  className="profilenums">
{propactive==="followers"? <div className="activeoption">
<h5 className="headingnums">23</h5>
<p className="nums">Followers</p>     
</div>: <div>
<h5 className="headingnums">23</h5>
<p className="nums">Followers</p>     
</div> }
</Link>

<Link className="profilenums" to="/following">

{propactive==="following"? <div className="activeoption">
<h5 className="headingnums">23</h5>
<p className="nums">Following</p>
</div>: <div>
<h5 className="headingnums">23</h5>
<p className="nums">Following</p>
</div> }
</Link>

</div>
</div>
</div>
</>

  )
}

export default Details