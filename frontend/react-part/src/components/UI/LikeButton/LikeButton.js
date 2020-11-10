import React, {Component} from 'react';
import classes from './LikeButton.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../../services/ServerService';
import { ReactComponent as FavoriteBorderIcon } from "../../../assets/icons/Heart.svg";
import { ReactComponent as Filledheart } from "../../../assets/icons/Filledheart.svg";

class LikeButton extends Component {

    state = {
        // likes: 0,
        isclicked: false,
        likes: 0
    };


    componentDidMount(){
        const data= this.props.pk;

      ServerService.readrecipe(data)
      .then(response=>{
        // console.log(response);
        this.setState({isclicked: response.data.like_is, likes: response.data.points})
      })
    }

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

        const data={
            pk: this.props.pk
        }
        // console.log(data)

        ServerService.like(data)
        .then((resp)=>{
            console.log(resp)          
          })
        
    };

    render() {

        if(!localStorage.getItem('access_token')){
            return (
            
               <Link to='/sign-in'><button onClick={this.addLike} className={classes.likebtn} > 
               <FavoriteBorderIcon className={classes.icon}/> <span className={classes.peoplecount}>{this.state.likes}</span>
               </button>

</Link> 
            )
        }


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