import React, {Component} from 'react';
import classes from './LikeButton.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../../services/ServerService';
import { ReactComponent as FavoriteBorderIcon } from "../../../assets/icons/Heart.svg";
import { ReactComponent as Filledheart } from "../../../assets/icons/Filledheart.svg";

class LikeButton extends Component {

    state = {
        likes: this.props.points,
        isclicked: this.props.likeis,
        pk: this.props.pk
    };




    // componentDidMount(){
    //    console.log(this.state.isclicked)
    // }

    addLike = () => {
 
        if(this.state.isclicked){
            this.setState({likes: this.state.likes-1})
        }
        else{
            this.setState({likes: this.state.likes+1})
        }

          this.setState({
          isclicked: ((this.state.isclicked)?false:true)
        });

        // const pk: this.state.pk;
        const pk= this.state.pk
        const data={
            tweetid: this.state.pk
        }

        ServerService.like(pk,data)
        .then((resp)=>{
            console.log(resp)          
          })
        
    };

    render() {

        if(this.state.isclicked){
            return (
            
                <div onClick={this.addLike} className={classes.likebtn} >
                    {/* <i className="fa fa-heart" aria-hidden="true"></i> {this.state.likes} */}
                    <Filledheart className={classes.icon}/> <span className={classes.peoplecount}>{this.state.likes}</span>
                </div>
            )
        }

        else{
            return (
            
                <div onClick={this.addLike} className={classes.likebtn} > 
                {/* <i className="far fa-heart"></i> {this.state.likes} */}
                <FavoriteBorderIcon className={classes.icon}/> <span className={classes.peoplecount}>{this.state.likes}</span>
                </div>
            )
        }
        
    }
}

export default LikeButton;