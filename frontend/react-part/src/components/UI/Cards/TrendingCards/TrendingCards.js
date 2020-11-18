import React, {Component } from "react";
import axios from 'axios'

class TrendingCards extends Component {
render(){
return(
<div class="card trendcard">
<div class="card-header trendhead">
<h6 className="trendingtag">{this.props.serial}. <span>Trending</span></h6>
<h5 className="tagname">{this.props.hashtag}</h5>
<h6 className="trendingfoot">{this.props.count} <span>Tweets</span></h6>
</div>
</div>
)
}
}


export default TrendingCards;