import React, { Component } from 'react';
import classes from './BookmarkButton.module.css';
import ServerService from '../../../services/ServerService';
import Filledbookmark from '@material-ui/icons/TurnedIn';
import Bookmarkbtn from '@material-ui/icons/TurnedInNot';


class BookmarkButton extends Component {

    state = {
        likes: 1,
        // isclicked: true,
        isclicked: this.props.bookmarkedis,
        pk: this.props.pk
    };

    componentDidMount() {
        // const data = this.props.pk;

        //   ServerService.readrecipe(data)
        //   .then(response=>{
        //     // console.log(response);
        //     this.setState({isclicked: response.data.bookmark_is,})
        //   })
    }

    handlechange = () => {
        this.setState({
            isclicked: ((this.state.isclicked) ? false : true)
        });

        // console.log(data)

        // axios.post('https://776d58591d10.ngrok.io/recipe/bookmark/', data,
        // {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        //     },

        // }) 
        const pk = this.state.pk

        const data = {
            tweetid: this.state.pk
        }

        ServerService.bookmark(pk, data)
            .then((resp) => {
                console.log(resp)
            })

    };

    render() {

        if (this.state.isclicked) {
            return (

                <div onClick={this.handlechange} className={classes.bookmarkbtn} >
                    <Filledbookmark className={classes.filled} />
                    {/* <span className={classes.peoplecount}>{this.state.likes}</span> */}
                </div>
            )
        }

        else {
            return (

                <div onClick={this.handlechange} className={classes.bookmarkbtn} >
                    <Bookmarkbtn className={classes.icon} />
                    {/* <span className={classes.peoplecount}>{this.state.likes}</span> */}
                </div>
            )
        }

    }
}

export default BookmarkButton;