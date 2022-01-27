import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {host, request} from '../utils/request.js';


const useStyles = makeStyles((theme) => ({
  commentBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBlock: theme.spacing(2),
    paddingBlock: theme.spacing(2),
    paddingInline: theme.spacing(2),
    backgroundColor: '#F2F3F4',
    borderRadius: theme.spacing(1),
    opacity: 0.8,
  },
  commentButton: {
    marginTop: theme.spacing(2)
  }
}));

export default function CommentForm(props) {

  const classes = useStyles();
  const [comment, setComment] = React.useState('');
  console.log(props.blogId);
  const handleCommentChange = (event) =>{
    setComment(event.target.value);
  }

  const submit = (event) => {
    event.preventDefault();
    let baseURI = `${host}/comments`;
    let action = 'create';

    let body = {
      content: comment,
      format: 'json',
      blog_id: props.blogId
    }

    request.post(baseURI, body).then(res => {
      
    })
    
  }
  return (
    <Box className={classes.commentBox}>
      <form className={classes.form} onSubmit={submit} method='POST'>
        <TextField
            id="outlined-multiline-static"
            multiline
            fullWidth
            rows={3}
            placeholder="Write Down Your Comment..."
            variant="outlined"
            onChange={handleCommentChange}
          />
        <Button className={classes.commentButton} variant="contained" color="primary">Comment</Button>
      </form>
    </Box>
  )
}