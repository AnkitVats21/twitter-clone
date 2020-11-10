import React, {Component} from 'react';
import classes from './BookmarkButton.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ServerService from '../../../services/ServerService';
// import { ReactComponent as Bookmarkbtn } from "../../../assets/icons/Bookmark.svg";
// import  from '@material-ui/icons/BookmarkBorder';
// import  from '@material-ui/icons/Bookmark';
import Filledbookmark from '@material-ui/icons/TurnedIn';
import Bookmarkbtn from '@material-ui/icons/TurnedInNot';
// import { ReactComponent as  } from "../../../assets/icons/Filledbookmark.svg";

class BookmarkButton extends Component {

    state = {
        likes: 1,
        isclicked: false
    };

    componentDidMount(){
        const data= this.props.pk;

      ServerService.readrecipe(data)
      .then(response=>{
        // console.log(response);
        this.setState({isclicked: response.data.bookmark_is,})
      })
    }

    handlechange = () => {
          this.setState({
          isclicked: ((this.state.isclicked)?false:true)
        });

        const data={
            pk: this.props.pk
        }
        // console.log(data)

        // axios.post('https://776d58591d10.ngrok.io/recipe/bookmark/', data,
        // {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        //     },
            
        // }) 
        ServerService.bookmark(data)
        .then((resp)=>{
            console.log(resp)          
          })
        
    };

    render() {

        if(!localStorage.getItem('access_token')){
            return (
            
               <Link to='/sign-in'><div className={classes.bookmarkbtn} > 
               <Filledbookmark className={classes.filled}/><span className={classes.peoplecount}>{this.state.likes}</span>
               </div>

</Link> 
            )
        }



        if(this.state.isclicked){
            return (
            
                <div onClick={this.handlechange} className={classes.bookmarkbtn} >
                    <Filledbookmark className={classes.filled}/><span className={classes.peoplecount}>{this.state.likes}</span>
                </div>
            )
        }

        else{
            return (
            
                <div onClick={this.handlechange} className={classes.bookmarkbtn} > 
                <Bookmarkbtn className={classes.icon}/><span className={classes.peoplecount}>{this.state.likes}</span>
                </div>
            )
        }
        
    }
}

export default BookmarkButton;