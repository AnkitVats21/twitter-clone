import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import Post from '../../Feed/Post'
import ServerService from '../../../services/ServerService'
import axios from 'axios'
import {ReactComponent as MessageIcon} from '../../../assets/icons/envelope.svg'
import Loader from 'react-loader-spinner'


class UserInfo extends Component {
    state={
        userdetails:[],
        profiledet:[],
        connect:[],
        redirect: null,
        isloading:true,
        isfollow:false
      }

      componentDidMount(){
        
            const data=this.props.userid

          ServerService.otherdetails(data)
        .then(response=>{
          console.log(response.data);
          this.setState({userdetails: response.data, isfollow:response.data.following, profiledet: response.data.profile, connect: response.data.connections, isloading: false})
        })
      }

      handlefollow=()=>{
        const data = this.state.userdetails.id
        console.log(data)
        
        ServerService.connect(data)
        .then(response=>{
          console.log(response);
        })

        console.log(this.state.follow)
        if(this.state.isfollow){
            this.setState({isfollow:false})
        }
        else{
            this.setState({isfollow:true})
        }

    }

      createchat=()=>{
        const data={
        receiver: this.state.userdetails.username
        }
        console.log(data)
        ServerService.newchat(data)
      .then((resp)=>{
        console.log(resp)      
        this.setState({ redirect: "/messages" })
      })
      }

      render(){

        console.log(this.state.isfollow)

        if(this.state.redirect){
          return <Redirect to= {this.state.redirect} />
        }

        if(this.state.isloading){
          return  (
            <>
          <Loader
          type="TailSpin"
          color="#657EFF"
          height={100}
          width={100}
          className="profilespinner"
       />
       </>
       );
        }

        else{

return(
    <>
<div className="feed__header">
<h2>Profile</h2>
</div>
<div className="profilewrap">

{this.state.profiledet.cover_pic?
<div className="coverimg" style={{  
backgroundImage: "url(" + this.state.profiledet.cover_pic + ")",
backgroundPosition: 'center',
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat'
}}>{this.state.profiledet.picture?<img className="profileimg" src={this.state.profiledet.picture} /> :<img className="profileimg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg=="/>}
</div>:
<div className="coverimg" style={{  
backgroundImage: "url(" + "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" + ")",
backgroundPosition: 'center',
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat'
}}>{this.state.profiledet.picture?<img className="profileimg" src={this.state.profiledet.picture} /> :<img className="profileimg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg=="/>}
</div>
}


  
<div className="profiledetails">
<div className="detailsline">
  <div>
<h4 className="personname">{this.state.profiledet.name}</h4>
<h5 className="personusername">@{this.state.userdetails.username}</h5>
</div>
<div>

<button onClick={this.createchat} className="editprofile msgbtn"><MessageIcon className="messageicon" /></button>
{/*  */}
{this.state.isfollow? <button onClick={this.handlefollow} className="editprofile"><span className="editprofiletext">Unfollow</span></button>
:<button onClick={this.handlefollow} className="editprofile"><span className="editprofiletext">Follow</span></button>
}
{/* <button className="editprofile"><span className="editprofiletext">Follow</span></button> */}
{/*  */}
</div>
</div>
<p className="biotext">{this.state.profiledet.bio}
  </p>

<div className="options">
<Link to="/user-profile" className="profilenums">
{this.props.propactive==="posts"? <div className="activeoption">
<h5 className="headingnums">{this.state.userdetails.posts}</h5>
<p className="nums">Posts</p>
</div>: <div>
<h5 className="headingnums">{this.state.userdetails.posts}</h5>
<p className="nums">Posts</p>
</div> }
</Link>

<Link to="/user-followers"  className="profilenums">
{this.props.propactive==="followers"? <div className="activeoption">
<h5 className="headingnums">{this.state.connect.follower}</h5>
<p className="nums">Followers</p>     
</div>: <div>
<h5 className="headingnums">{this.state.connect.follower}</h5>
<p className="nums">Followers</p>     
</div> }
</Link>

<Link className="profilenums" to="/user-following">

{this.props.propactive==="following"? <div className="activeoption">
<h5 className="headingnums">{this.state.connect.following}</h5>
<p className="nums">Following</p>
</div>: <div>
<h5 className="headingnums">{this.state.connect.following}</h5>
<p className="nums">Following</p>
</div> }
</Link>


</div>
</div>
</div>
</>
);
}
      }
}

export default UserInfo;
