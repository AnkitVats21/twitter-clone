import React, {useState} from 'react';
import {Modal,Button} from 'react-bootstrap'
import classes from '../PostModal/PostModal.module.css'
import ImageIcon from '@material-ui/icons/Image';
import {Redirect} from 'react-router-dom'
import VideoIcon from '@material-ui/icons/Movie';
import axios from 'axios'
import CommentCard from '../../Commentbox/CommentCard'
import ServerService from '../../../services/ServerService';

function PostModal(props) {
  const [text, setText] = useState(null);
  const [img, setImg] = useState(null);
  const [vid, setVid] = useState(null);
  const [redirect, setredirect] = useState(null);

  const handleimg=(e)=>{
    setImg(e.target.files[0])
}

  const handlevideo=(e)=>{
    setVid(e.target.files[0])
}

  const handlepost=()=>{
    // console.log("hi")
const data={
  tweet: props.id,
  text: text,
  photos:img,
  videos:vid
}

const formdata = new FormData();
for (let formElement in data) {
  formdata.append(formElement, data[formElement]);
  console.log(formElement, data[formElement]);
}

// console.log(data)
      ServerService.postretweet(formdata)
      .then(response=>{
        console.log(response);
        setredirect('/profile')
      })

      setImg(null);
      setVid(null);

    props.onHide()
  }

  if(redirect){
    return <Redirect to= {redirect} />
  }

    return (
      <Modal
        {...props}
        // size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Retweet
            {/* <Button className={classes.postbtn}>Add Media</Button> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <textarea onChange={event => setText(event.target.value)} type="text" rows="2" className={classes.modalfield} />
{/*  */}
    <CommentCard 
    image={props.image}
    key={props.id} displayName={props.name} 
    username={props.username} text={props.text} 
    avatar={props.avatar}
    />
    {/*  */}

        </Modal.Body>
        <Modal.Footer>

          <input onChange={handleimg} className={classes.hidden} id="postimage" type="file" name="file" />
          <label  htmlFor="postimage"><ImageIcon className={classes.galleryicon} /></label>

          <input onChange={handlevideo} className={classes.hidden} id="postvideo" type="file" name="file" />
          <label  htmlFor="postvideo"><VideoIcon className={classes.galleryicon} /></label>

          <Button className={classes.postbtn} onClick={handlepost}>Retweet</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default PostModal;