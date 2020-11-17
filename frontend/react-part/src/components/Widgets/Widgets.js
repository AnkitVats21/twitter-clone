import React, {Component} from "react";
import {Link} from 'react-router-dom';
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

class Widgets extends Component {

state={
  term:null
}

handlechangeall = (event) =>{
    this.setState ( { [event.target.name] :event.target.value  } )
   }

   render(){
  return (
    <div className="widgets">

        <h2 className="hidetext">Search</h2>

        {this.props.search==="hide"? null: <div className="widgets__input">
        
        <input 
        // onKeyDown={(e)=>onEnterPress(e)}
         className="widgets__searchbar" onChange={this.handlechangeall} name="term" placeholder="Search Twitter" type="text" />
        <Link to= {{
                pathname:'/search',
                state:{query: this.state.term}
              }}><SearchIcon className="widgets__searchIcon" /></Link>
      </div> }

      {/* <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input className="widgets__searchbar" placeholder="Search Twitter" type="text" />
      </div> */}
      
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>

        <TwitterTweetEmbed tweetId={"1321108009754525700"} />
        <TwitterTweetEmbed tweetId={"1321070234782973952"} />

      </div>
    </div>
  );
}
}

export default Widgets;