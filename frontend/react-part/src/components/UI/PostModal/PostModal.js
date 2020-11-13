import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap'
import classes from './PostModal.module.css'
import ImageIcon from '@material-ui/icons/Image';

function PostModal(props) {
    return (
      <Modal
        {...props}
        // size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            What's on Your Mind?
            {/* <Button className={classes.postbtn}>Add Media</Button> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
<textarea type="text" rows="6" className={classes.modalfield}></textarea>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button className={classes.postbtn}>Attachment</Button> */}
          <ImageIcon className={classes.galleryicon} />
          <Button className={classes.postbtn} onClick={props.onHide}>Post</Button>
        </Modal.Footer>
      </Modal>
    );
  }
export default PostModal;