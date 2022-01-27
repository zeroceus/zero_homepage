import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import {zero_host, request, jump} from '../../utils/request.js';
import { ReactTrixRTEInput } from "react-trix-rte";

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: 'white',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    form: { 
        margin: ''
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    editor: {
        minHeight: 240,
    },
    submit: {
        marginTop: theme.spacing(2)
    }
}));

export default function Form (props) {
  const classes = useStyles();
  const blog = props.blog;
  const [title, setTitle] = React.useState(blog.title||'');
  const [category_id, setCategoryId] = React.useState(blog.category_id||``);
  const [content, setContent] = React.useState(blog.content||'');
  
  const handleTitleChange = (event) =>{
    setTitle(event.target.value);
  }

  const handleCategoryIdChange = (event) =>{
    setCategoryId(event.target.value);
  }
  
  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  const removeAttachment = (event) => {
      const signed_id = event.attachment.attachment.attributes.values.url.split('/')[4];
      const baseURI = `${zero_host}/blobs/${signed_id}`;

      request().delete(baseURI).then(res => {
          console.log(res);
      }).catch(err =>{
          console.log(err);
      })
  }

  const submit = (event) => {
    event.preventDefault();
    let baseURI = `${zero_host}`;
    let action;

    if(!props.blog.id) {
        baseURI = `${baseURI}/blogs`;
        action = 'create';
    }else {
        baseURI = `${baseURI}/blogs/${props.blog.id}`;
        action = 'update';
    }

    let body = {
        title: title,
        category_id: category_id,
        content: content,
        format: 'json'
    }

    if(action == 'create') {
        request().post(baseURI, body).then(res => {
            jump(`${zero_host}/blogs`);
        });
    }else {
        request().put(baseURI, body).then(res => {
            jump(`${zero_host}/blogs`);
        }).catch(err => {
            console.log(err);
        });
    }
    
  }

  return (
    <Box
        component="main"
        className={classes.box}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
            <Box sx={{ mt: 2, mb: 2}}>
                <Typography component="h2" variant="h6" color="primary">  {props.title} </Typography>
            </Box>
            <form className={classes.form} onSubmit={submit} method='POST'>
                <Container maxWidth="md">   
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                onChange={handleTitleChange}
                autoFocus
                defaultValue={blog.title}
            />
            <FormControl className={classes.formControl}>
                <Select
                    value={category_id}
                    defaultValue={blog.category_id}
                    onChange={handleCategoryIdChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value={``} disabled>
                        Category
                    </MenuItem>
                    {
                        props.categories.length > 0 ? (props.categories.map((category) => (<MenuItem value={category[1]} key={category[1]}>{category[0]}</MenuItem>))) : 
                        (<Typography component="h2" variant="h6" color="secondary">  No categories yet </Typography>)
                    }
                </Select>
            </FormControl>
            <ReactTrixRTEInput
                onChange={handleContentChange}
                isRailsDirectUpload={true}
                onAttachmentRemove={removeAttachment}
                className={classes.editor}
                placeholder="Input your content......"
                defaultValue={blog.content||``}/>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Submit
            </Button>
            </Container>
            </form>
        </Container>
    </Box>
  );
}